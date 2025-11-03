# 🆓 免费云端部署指南

本文档提供完全免费的云端部署方案，无需服务器，适合演示、学习和小型项目使用。

## 📋 部署方案概览

我们将使用以下免费服务：

| 服务类型 | 推荐平台 | 免费额度 | 特点 |
|---------|---------|---------|------|
| **前端托管** | Vercel | 无限 | 自动 CDN，秒级部署 |
| **后端托管** | Render | 750小时/月 | 支持 WebSocket，自动休眠 |
| **Redis 数据库** | Upstash | 10,000 命令/天 | Serverless Redis，按需计费 |
| **备选方案** | Railway | $5 免费额度/月 | 全栈部署，更简单 |

---

## 🚀 方案一：Vercel + Render + Upstash（推荐）

### 优点
- ✅ 完全免费
- ✅ 自动 HTTPS
- ✅ 全球 CDN 加速
- ✅ 自动部署（Git 推送即部署）
- ✅ 零运维

### 缺点
- ⚠️ 后端服务 15 分钟无访问会休眠
- ⚠️ Redis 有命令数限制

---

## 📝 详细部署步骤

### 第一步：准备工作

#### 1. 注册账号

```
- Vercel: https://vercel.com (使用 GitHub 登录)
- Render: https://render.com (使用 GitHub 登录)
- Upstash: https://upstash.com (使用 GitHub 登录)
- GitHub: https://github.com (如果还没有)
```

#### 2. 准备代码仓库

```bash
# 1. 在 GitHub 上创建仓库
# 2. 推送代码到 GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/你的用户名/hospital-dashboard.git
git push -u origin main
```

---

### 第二步：部署 Redis (Upstash)

#### 1. 创建 Redis 数据库

1. 登录 [Upstash Console](https://console.upstash.com)
2. 点击 **Create Database**
3. 配置：
   - **Name**: `hospital-dashboard`
   - **Type**: `Regional`（选择离你最近的区域，如 `ap-southeast-1`）
   - **TLS**: `Enabled`
4. 点击 **Create**

#### 2. 获取连接信息

创建完成后，复制以下信息：

```
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxA
```

或传统连接方式：

```
REDIS_HOST=xxxxx.upstash.io
REDIS_PORT=6379
REDIS_PASSWORD=your_password
```

---

### 第三步：部署后端 (Render)

#### 1. 创建 Web Service

1. 登录 [Render Dashboard](https://dashboard.render.com)
2. 点击 **New +** → **Web Service**
3. 连接你的 GitHub 仓库
4. 配置：

```yaml
Name: hospital-backend
Environment: Node
Build Command: cd backend && npm install
Start Command: cd backend && node server.js
Instance Type: Free
```

#### 2. 配置环境变量

在 **Environment** 标签页添加：

```bash
NODE_ENV=production
PORT=3000

# Redis 配置 (使用 Upstash 的信息)
REDIS_HOST=xxxxx.upstash.io
REDIS_PORT=6379
REDIS_PASSWORD=your_upstash_password
REDIS_TLS=true

# 或使用 Upstash REST API (推荐)
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token

# CORS 配置
CORS_ORIGIN=https://你的前端域名.vercel.app
```

#### 3. 部署

点击 **Create Web Service**，等待部署完成（约 3-5 分钟）

部署完成后，你会得到一个 URL：
```
https://hospital-backend.onrender.com
```

#### 4. 修改后端代码以支持 Upstash

创建文件 `backend/config/redis.js`：

```javascript
const Redis = require('ioredis');

// 根据环境变量选择连接方式
function createRedisClient() {
  if (process.env.UPSTASH_REDIS_REST_URL) {
    // 使用 Upstash REST API (推荐)
    const { Redis } = require('@upstash/redis');
    return new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  } else {
    // 使用传统 Redis 连接
    return new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASSWORD,
      tls: process.env.REDIS_TLS === 'true' ? {} : undefined,
    });
  }
}

module.exports = createRedisClient();
```

#### 5. 更新 package.json

在 `backend/package.json` 添加依赖：

```json
{
  "dependencies": {
    "@upstash/redis": "^1.25.0",
    "ioredis": "^5.3.2"
  }
}
```

---

### 第四步：部署前端 (Vercel)

#### 1. 修改前端配置

编辑 `frontend/src/api/index.js`，使用环境变量：

```javascript
// 使用环境变量配置 API 地址
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL || 'ws://localhost:3000';

export default {
  baseURL: API_BASE_URL,
  wsURL: WS_BASE_URL,
  // ... 其他配置
};
```

#### 2. 创建 Vercel 配置文件

在 `frontend/` 目录下创建 `vercel.json`：

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

#### 3. 部署到 Vercel

**方式 A: 通过 Vercel 网站**

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 **Add New** → **Project**
3. 导入你的 GitHub 仓库
4. 配置：
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. 添加环境变量：

```bash
VITE_API_BASE_URL=https://hospital-backend.onrender.com
VITE_WS_BASE_URL=wss://hospital-backend.onrender.com
```

6. 点击 **Deploy**

**方式 B: 通过 Vercel CLI**

```bash
# 安装 Vercel CLI
npm install -g vercel

# 进入前端目录
cd frontend

# 登录
vercel login

# 部署
vercel

# 添加环境变量
vercel env add VITE_API_BASE_URL production
# 输入: https://hospital-backend.onrender.com

vercel env add VITE_WS_BASE_URL production
# 输入: wss://hospital-backend.onrender.com

# 重新部署
vercel --prod
```

#### 4. 获取访问地址

部署完成后，你会得到：
```
https://hospital-dashboard-xxx.vercel.app
```

---

### 第五步：更新后端 CORS 配置

回到 Render，更新后端环境变量：

```bash
CORS_ORIGIN=https://hospital-dashboard-xxx.vercel.app
```

然后在 `backend/server.js` 中更新 CORS 配置：

```javascript
const cors = require('cors');

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
```

---

## 🔄 方案二：Railway 全栈部署（更简单）

Railway 提供 $5/月 免费额度，适合小型项目全栈部署。

### 部署步骤

#### 1. 准备配置文件

创建 `railway.json`：

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "numReplicas": 1,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

创建 `Procfile`：

```
web: cd backend && node server.js
```

#### 2. 部署

1. 登录 [Railway](https://railway.app)
2. 点击 **New Project** → **Deploy from GitHub repo**
3. 选择你的仓库
4. Railway 会自动检测并部署

#### 3. 添加 Redis

1. 在项目中点击 **New**
2. 选择 **Database** → **Add Redis**
3. Railway 会自动配置环境变量 `REDIS_URL`

#### 4. 配置环境变量

```bash
NODE_ENV=production
PORT=3000
# Redis URL 会自动配置
```

#### 5. 部署前端

可以继续使用 Vercel 部署前端，或在 Railway 中添加另一个服务：

1. 点击 **New** → **GitHub Repo**
2. 配置 Root Directory: `frontend`
3. 添加环境变量：

```bash
VITE_API_BASE_URL=https://your-backend.railway.app
VITE_WS_BASE_URL=wss://your-backend.railway.app
```

---

## 🎯 方案三：Zeabur（国内友好）

Zeabur 是中国团队开发的部署平台，对国内访问更友好。

### 部署步骤

1. 登录 [Zeabur](https://zeabur.com)
2. 创建项目
3. 添加服务：
   - Git 服务（后端）
   - Git 服务（前端）
   - Marketplace → Redis
4. 配置环境变量（同上）

### 免费额度

- 每月 $5 免费额度
- 自动休眠机制

---

## 📊 方案对比

| 特性 | Vercel+Render | Railway | Zeabur |
|------|--------------|---------|--------|
| **部署难度** | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ |
| **免费额度** | 无限/750h | $5/月 | $5/月 |
| **国内访问** | 较快 | 较慢 | 快 |
| **自动休眠** | 是 | 可选 | 可选 |
| **WebSocket** | 支持 | 支持 | 支持 |
| **自定义域名** | 免费 | 免费 | 免费 |
| **自动 HTTPS** | 是 | 是 | 是 |

---

## 🔧 必要的代码修改

### 1. 后端支持 Upstash Redis

安装依赖：

```bash
cd backend
npm install @upstash/redis ioredis
```

修改 `backend/utils/realtime.js`：

```javascript
const Redis = require('ioredis');

// 创建 Redis 客户端
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD,
  tls: process.env.REDIS_TLS === 'true' ? {} : undefined,
  lazyConnect: true,
  retryStrategy: (times) => {
    if (times > 3) {
      return null; // 停止重试
    }
    return Math.min(times * 1000, 3000);
  }
});

redis.connect().catch(err => {
  console.warn('Redis connection failed, running without cache:', err.message);
});

module.exports = redis;
```

### 2. 前端环境变量

修改 `frontend/vite.config.js`：

```javascript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_API_BASE_URL || 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  },
  // 确保环境变量可用
  define: {
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify(
      process.env.VITE_API_BASE_URL
    ),
    'import.meta.env.VITE_WS_BASE_URL': JSON.stringify(
      process.env.VITE_WS_BASE_URL
    )
  }
});
```

### 3. 添加健康检查

在 `backend/server.js` 添加：

```javascript
// 健康检查端点
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 根路径
app.get('/', (req, res) => {
  res.json({ 
    message: 'Hospital Dashboard API',
    version: '1.0.0'
  });
});
```

---

## 🛠️ 部署后配置

### 1. 配置自定义域名（可选）

#### Vercel (前端)

1. 前往 **Settings** → **Domains**
2. 添加你的域名
3. 按提示配置 DNS：
   ```
   Type: CNAME
   Name: www (或其他子域名)
   Value: cname.vercel-dns.com
   ```

#### Render (后端)

1. 前往 **Settings** → **Custom Domain**
2. 添加域名
3. 配置 DNS：
   ```
   Type: CNAME
   Name: api
   Value: your-service.onrender.com
   ```

### 2. 配置自动部署

两个平台都支持 Git 推送自动部署：

```bash
git add .
git commit -m "Update code"
git push origin main
# 自动触发部署
```

### 3. 查看日志

- **Vercel**: Dashboard → 项目 → Deployments → 点击部署 → Logs
- **Render**: Dashboard → Service → Logs

---

## 📈 性能优化建议

### 1. 减少后端休眠

使用 UptimeRobot 等免费监控服务定期 ping 你的后端：

1. 注册 [UptimeRobot](https://uptimerobot.com)
2. 添加监控：
   - **Monitor Type**: HTTP(s)
   - **URL**: `https://hospital-backend.onrender.com/health`
   - **Monitoring Interval**: 5 minutes

### 2. 启用缓存

在前端使用 Service Worker 缓存静态资源。

### 3. 图片优化

将图片上传到免费 CDN（如 Cloudflare Images Free Tier）。

---

## 🐛 常见问题

### Q1: Render 服务休眠问题

**问题**: 后端 15 分钟无访问会休眠，第一次访问很慢

**解决方案**:
```bash
# 方案 1: 使用 UptimeRobot 每 5 分钟 ping 一次（推荐）
# 方案 2: 升级到 Render 付费计划（$7/月）
# 方案 3: 切换到 Railway/Zeabur（有免费额度但不休眠）
```

### Q2: Upstash Redis 命令数限制

**问题**: 免费套餐每天 10,000 次命令

**解决方案**:
```javascript
// 在后端添加缓存层，减少 Redis 访问
const cache = new Map();
const CACHE_TTL = 5000; // 5 秒本地缓存

async function getCachedData(key) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.time < CACHE_TTL) {
    return cached.data;
  }
  const data = await redis.get(key);
  cache.set(key, { data, time: Date.now() });
  return data;
}
```

### Q3: WebSocket 连接失败

**问题**: 前端无法连接 WebSocket

**检查清单**:
```bash
# 1. 确认后端支持 WebSocket
# 2. 使用 wss:// 而不是 ws://
# 3. 检查 CORS 配置
# 4. 查看浏览器控制台错误
```

### Q4: 构建失败

**问题**: Vercel/Render 构建失败

**解决**:
```bash
# 1. 检查 Node.js 版本
# 在 package.json 中指定：
{
  "engines": {
    "node": ">=18.0.0"
  }
}

# 2. 清除缓存重新部署
# Vercel: Settings → General → Clear Cache
# Render: 手动触发重新部署
```

---

## 💰 成本估算

### 完全免费方案

使用 Vercel + Render Free + Upstash Free：

```
前端托管 (Vercel):        $0/月
后端托管 (Render Free):   $0/月
Redis (Upstash Free):     $0/月
域名 (可选):              $10/年
─────────────────────────────
总计:                    $0/月
```

### 升级方案（无休眠）

如果需要去除休眠限制：

```
前端托管 (Vercel):        $0/月
后端托管 (Render):        $7/月
Redis (Upstash Pro):      $10/月
域名:                    $10/年
─────────────────────────────
总计:                    $17/月
```

### Railway 方案

使用 Railway 全栈部署：

```
服务托管 + Redis:         $5/月 (免费额度)
超出后:                  $0.000231/GB-s
域名:                    $10/年
─────────────────────────────
总计:                    约 $0-5/月
```

---

## ✅ 部署检查清单

完成部署后，确认以下事项：

- [ ] Upstash Redis 数据库已创建
- [ ] 后端部署到 Render 并正常运行
- [ ] 前端部署到 Vercel 并正常运行
- [ ] 环境变量配置正确
- [ ] API 健康检查通过 `/health`
- [ ] 前端可以访问后端 API
- [ ] WebSocket 实时数据正常
- [ ] CORS 配置正确
- [ ] HTTPS 自动启用
- [ ] (可选) 配置自定义域名
- [ ] (可选) 配置 UptimeRobot 防止休眠
- [ ] (可选) 配置 GitHub Actions 自动化测试

---

## 🎓 推荐学习资源

- [Vercel 文档](https://vercel.com/docs)
- [Render 文档](https://render.com/docs)
- [Upstash 文档](https://docs.upstash.com)
- [Railway 文档](https://docs.railway.app)
- [免费开发者资源列表](https://free-for.dev)

---

## 🔄 后续维护

### 自动部署工作流

每次推送代码到 GitHub，都会自动触发部署：

```bash
# 1. 修改代码
git add .
git commit -m "Update feature"
git push origin main

# 2. Vercel 和 Render 自动部署
# 3. 查看部署状态
# Vercel: https://vercel.com/dashboard
# Render: https://dashboard.render.com

# 4. 验证部署
curl https://hospital-backend.onrender.com/health
```

### 监控和告警

使用免费监控服务：

1. **UptimeRobot**: 监控服务可用性
2. **Sentry** (免费版): 监控错误和性能
3. **LogRocket** (免费版): 用户行为分析

---

## 🆘 获取帮助

- **Vercel 社区**: https://github.com/vercel/vercel/discussions
- **Render 论坛**: https://community.render.com
- **Upstash Discord**: https://upstash.com/discord
- **项目 Issues**: https://github.com/yourorg/hospital-dashboard/issues

---

**恭喜！你已成功部署到云端！** 🎉

现在你的应用已经：
- ✅ 全球访问
- ✅ 自动 HTTPS
- ✅ CDN 加速
- ✅ 零运维
- ✅ 完全免费

快去分享你的项目吧：`https://hospital-dashboard-xxx.vercel.app`

