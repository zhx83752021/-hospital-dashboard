/**
 * Redis 配置文件
 * 支持多种云平台的 Redis 服务
 */

import Redis from 'ioredis';

/**
 * 创建 Redis 客户端
 * 优先级：Upstash REST API > Railway Redis > 传统 Redis 连接
 */
async function createRedisClient() {
  // 方案 1: Upstash REST API (推荐用于 Serverless)
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    console.log('🔌 Using Upstash Redis REST API');
    try {
      const { Redis: UpstashRedis } = await import('@upstash/redis');
      return new UpstashRedis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      });
    } catch (error) {
      console.warn('⚠️  @upstash/redis not installed, falling back to ioredis');
      console.warn('Run: npm install @upstash/redis');
    }
  }

  // 方案 2: Railway Redis URL
  if (process.env.REDIS_URL) {
    console.log('🔌 Using Railway Redis URL');
    return new Redis(process.env.REDIS_URL, {
      lazyConnect: true,
      maxRetriesPerRequest: 3,
      retryStrategy: (times) => {
        if (times > 3) {
          console.error('❌ Redis connection failed after 3 retries');
          return null;
        }
        const delay = Math.min(times * 1000, 3000);
        console.log(`⏳ Retrying Redis connection in ${delay}ms...`);
        return delay;
      },
    });
  }

  // 方案 3: 传统 Redis 连接 (Upstash, Render, 自建)
  console.log('🔌 Using traditional Redis connection');
  const config = {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD,
    lazyConnect: true,
    maxRetriesPerRequest: 3,
    retryStrategy: (times) => {
      if (times > 3) {
        console.error('❌ Redis connection failed after 3 retries');
        return null;
      }
      const delay = Math.min(times * 1000, 3000);
      console.log(`⏳ Retrying Redis connection in ${delay}ms...`);
      return delay;
    },
  };

  // Upstash 和某些云平台需要 TLS
  if (process.env.REDIS_TLS === 'true' || process.env.REDIS_HOST?.includes('upstash.io')) {
    config.tls = {};
    console.log('🔒 TLS enabled for Redis connection');
  }

  return new Redis(config);
}

// 创建客户端实例
const redis = await createRedisClient();

// 连接 Redis
if (redis.connect) {
  redis.connect()
    .then(() => {
      console.log('✅ Redis connected successfully');
    })
    .catch((err) => {
      console.warn('⚠️  Redis connection failed, running without cache:', err.message);
      console.warn('💡 The app will continue to work, but without real-time data caching');
    });
}

// 优雅关闭
process.on('SIGTERM', () => {
  console.log('🛑 Closing Redis connection...');
  redis.quit().then(() => {
    console.log('✅ Redis connection closed');
    process.exit(0);
  });
});

// 添加本地内存缓存层（减少 Redis 调用）
class CachedRedis {
  constructor(redisClient) {
    this.redis = redisClient;
    this.cache = new Map();
    this.TTL = 5000; // 5 秒本地缓存
  }

  async get(key) {
    // 检查本地缓存
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.time < this.TTL) {
      return cached.data;
    }

    // 从 Redis 获取
    try {
      const data = await this.redis.get(key);
      this.cache.set(key, { data, time: Date.now() });
      return data;
    } catch (error) {
      console.error('Redis GET error:', error.message);
      return null;
    }
  }

  async set(key, value, ...args) {
    try {
      // 更新本地缓存
      this.cache.set(key, { data: value, time: Date.now() });
      // 更新 Redis
      return await this.redis.set(key, value, ...args);
    } catch (error) {
      console.error('Redis SET error:', error.message);
      return null;
    }
  }

  async del(key) {
    try {
      this.cache.delete(key);
      return await this.redis.del(key);
    } catch (error) {
      console.error('Redis DEL error:', error.message);
      return null;
    }
  }

  // 清理过期的本地缓存
  cleanCache() {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now - value.time > this.TTL) {
        this.cache.delete(key);
      }
    }
  }
}

// 创建带缓存的 Redis 实例
const cachedRedis = new CachedRedis(redis);

// 定期清理本地缓存
setInterval(() => cachedRedis.cleanCache(), 10000);

export default cachedRedis;

