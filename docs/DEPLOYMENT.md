# 部署指南

本文档提供医院数字化大屏系统的详细部署说明。

## 📋 部署前准备

### 系统要求

- **操作系统**: Linux (推荐 Ubuntu 20.04+) / Windows Server / macOS
- **Node.js**: >= 16.0.0
- **内存**: 最低 2GB，推荐 4GB+
- **磁盘**: 最低 10GB 可用空间
- **网络**: 稳定的网络连接

### 软件依赖

```bash
# Node.js 和 npm
node --version  # >= 16.0.0
npm --version   # >= 8.0.0

# PM2 (生产环境进程管理，推荐安装)
npm install -g pm2
```

## 🚀 部署步骤

### 1. 克隆项目

```bash
git clone <repository-url>
cd hospital-dashboard
```

### 2. 安装依赖

```bash
# 安装根依赖
npm install

# 安装前端依赖
cd frontend
npm install

# 安装后端依赖
cd ../backend
npm install
```

### 3. 配置环境变量

#### 后端配置

创建 `backend/.env` 文件：

```env
# 服务器配置
PORT=3000
NODE_ENV=production

# 数据库配置（如果使用）
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hospital_dashboard

# WebSocket配置
WS_PORT=3001
```

### 4. 构建前端

```bash
cd frontend
npm run build
```

构建完成后，生成的静态文件位于 `frontend/dist` 目录。

### 5. 启动后端服务

#### 开发环境

```bash
cd backend
npm run dev
```

#### 生产环境（使用 PM2）

```bash
cd backend

# 启动服务
pm2 start server.js --name hospital-backend

# 设置开机自启
pm2 startup
pm2 save

# 查看日志
pm2 logs hospital-backend

# 查看状态
pm2 status
```

## 🌐 Nginx 配置

### 安装 Nginx

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install nginx

# CentOS/RHEL
sudo yum install nginx
```

### 配置文件

创建 `/etc/nginx/sites-available/hospital-dashboard`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # 前端静态文件
    location / {
        root /path/to/hospital-dashboard/frontend/dist;
        try_files $uri $uri/ /index.html;
        index index.html;
    }

    # 后端API代理
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # WebSocket 支持
    location /socket.io {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss 
               application/javascript application/json;
}
```

### 启用配置

```bash
# 创建软链接
sudo ln -s /etc/nginx/sites-available/hospital-dashboard /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
```

## 🔒 HTTPS 配置（使用 Let's Encrypt）

```bash
# 安装 Certbot
sudo apt-get install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d your-domain.com

# 自动续期
sudo certbot renew --dry-run
```

## 🐳 Docker 部署

### Dockerfile - 前端

创建 `frontend/Dockerfile`:

```dockerfile
FROM node:16-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Dockerfile - 后端

创建 `backend/Dockerfile`:

```dockerfile
FROM node:16-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .

EXPOSE 3000
CMD ["node", "server.js"]
```

### Docker Compose

创建 `docker-compose.yml`:

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
    restart: unless-stopped

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped
```

### 启动容器

```bash
# 构建并启动
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

## 📊 监控和日志

### PM2 监控

```bash
# 实时监控
pm2 monit

# 查看日志
pm2 logs

# 重启服务
pm2 restart hospital-backend

# 停止服务
pm2 stop hospital-backend
```

### 日志管理

建议配置日志轮转，避免日志文件过大：

```bash
# 安装 pm2-logrotate
pm2 install pm2-logrotate

# 配置日志轮转
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 30
```

## 🔧 性能优化

### 前端优化

1. **开启 Gzip 压缩** (已在 Nginx 配置中)
2. **CDN 加速** - 将静态资源部署到 CDN
3. **图片优化** - 使用 WebP 格式
4. **代码分割** - Vite 已自动处理

### 后端优化

1. **启用集群模式**

```bash
pm2 start server.js -i max --name hospital-backend
```

2. **Redis 缓存** - 缓存频繁访问的数据
3. **数据库连接池** - 优化数据库连接
4. **负载均衡** - 使用 Nginx 做负载均衡

## 🛡️ 安全配置

### 1. 防火墙设置

```bash
# UFW (Ubuntu)
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp
sudo ufw enable
```

### 2. 限制 API 访问

在 Nginx 中配置 IP 白名单或使用 API 密钥。

### 3. 定期更新

```bash
# 更新系统包
sudo apt-get update && sudo apt-get upgrade

# 更新 Node.js 依赖
npm audit
npm audit fix
```

## 🔄 更新和维护

### 应用更新

```bash
# 1. 拉取最新代码
git pull origin main

# 2. 安装依赖
cd frontend && npm install
cd ../backend && npm install

# 3. 重新构建前端
cd frontend && npm run build

# 4. 重启后端
pm2 restart hospital-backend
```

### 数据备份

```bash
# 备份数据库（如果使用）
mysqldump -u root -p hospital_dashboard > backup.sql

# 备份配置文件
tar -czf config-backup.tar.gz backend/.env nginx.conf
```

## ❗ 故障排查

### 常见问题

1. **端口被占用**
```bash
# 查看端口占用
lsof -i :3000
netstat -ano | findstr :3000  # Windows

# 终止进程
kill -9 <PID>
```

2. **WebSocket 连接失败**
- 检查 Nginx WebSocket 配置
- 检查防火墙规则
- 验证后端服务是否正常运行

3. **前端资源加载失败**
- 检查 Nginx 静态文件路径
- 验证构建产物是否完整
- 检查文件权限

### 日志查看

```bash
# 后端日志
pm2 logs hospital-backend

# Nginx 日志
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# 系统日志
journalctl -u nginx -f
```

## 📞 技术支持

如遇到部署问题，请：

1. 查看日志文件
2. 检查系统资源（内存、磁盘）
3. 验证网络连接
4. 联系技术支持团队

---

**文档版本**: v1.0  
**更新日期**: 2025-10-29

