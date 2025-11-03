# 🚀 免费云端部署 - 10 分钟快速开始

> **目标**：无需服务器，10 分钟内将医院仪表盘部署到云端，完全免费！

---

## 📋 你需要准备的账号

在开始之前，请先注册以下免费账号（都可以用 GitHub 登录）：

1. ✅ **GitHub** - https://github.com
2. ✅ **Vercel** - https://vercel.com （前端托管）
3. ✅ **Render** - https://render.com （后端托管）
4. ✅ **Upstash** - https://upstash.com （Redis 数据库）

> 💡 **提示**：三个平台都支持 GitHub 登录，点击 "Sign in with GitHub" 即可。

---

## 🎯 部署步骤（按顺序）

### 步骤 1️⃣：创建 Redis 数据库（1 分钟）

1. 登录 [Upstash Console](https://console.upstash.com)
2. 点击 **Create Database**
3. 填写：
   - Name: `hospital`
   - Type: `Regional`
   - Region: 选最近的（如 `ap-southeast-1`）
4. 点击 **Create**
5. 📝 **复制保存**以下信息（点击 📋 图标复制）：
   ```
   UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
   UPSTASH_REDIS_REST_TOKEN=AxxxxxxxxxxxA
   ```

---

### 步骤 2️⃣：部署后端到 Render（3 分钟）

1. 登录 [Render Dashboard](https://dashboard.render.com)
2. 点击 **New +** → **Web Service**
3. 点击 **Connect a repository**（授权 GitHub）
4. 选择你的 `hospital-dashboard` 仓库
5. 填写配置：
   ```
   Name: hospital-backend
   Environment: Node
   Build Command: cd backend && npm install
   Start Command: cd backend && node server.js
   Instance Type: Free
   ```
6. 点击 **Advanced** → **Add Environment Variable**，添加：
   
   | Key | Value |
   |-----|-------|
   | `NODE_ENV` | `production` |
   | `PORT` | `3000` |
   | `UPSTASH_REDIS_REST_URL` | 粘贴步骤 1 复制的 URL |
   | `UPSTASH_REDIS_REST_TOKEN` | 粘贴步骤 1 复制的 Token |
   | `CORS_ORIGIN` | `*` |

7. 点击 **Create Web Service**
8. ⏳ 等待 3-5 分钟部署完成
9. 📝 **复制保存**你的后端 URL（如 `https://hospital-backend.onrender.com`）

---

### 步骤 3️⃣：部署前端到 Vercel（2 分钟）

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 **Add New** → **Project**
3. 点击 **Import Git Repository**
4. 选择你的 `hospital-dashboard` 仓库
5. 配置：
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build (自动检测)
   Output Directory: dist (自动检测)
   ```
6. 点击 **Environment Variables**，添加：
   
   | Key | Value |
   |-----|-------|
   | `VITE_API_BASE_URL` | `https://hospital-backend.onrender.com` |
   | `VITE_WS_BASE_URL` | `wss://hospital-backend.onrender.com` |
   
   > ⚠️ 注意：第二个是 `wss://` 不是 `ws://`

7. 点击 **Deploy**
8. ⏳ 等待 1-2 分钟部署完成
9. 🎉 复制你的前端 URL（如 `https://hospital-dashboard-xxx.vercel.app`）

---

### 步骤 4️⃣：更新后端 CORS（1 分钟）

1. 回到 **Render Dashboard** → 你的后端服务
2. 点击 **Environment** 标签
3. 找到 `CORS_ORIGIN`，点击编辑
4. 改成你的前端 URL：`https://hospital-dashboard-xxx.vercel.app`
5. 点击 **Save Changes**
6. ⏳ 等待 1 分钟自动重启

---

### 步骤 5️⃣：测试你的应用（1 分钟）

1. **测试后端**：
   ```
   访问：https://hospital-backend.onrender.com/health
   期望：看到 {"status":"ok", ...}
   ```

2. **测试前端**：
   ```
   访问：https://hospital-dashboard-xxx.vercel.app
   期望：看到完整的医院仪表盘
   ```

3. **检查功能**：
   - ✅ 页面正常显示
   - ✅ 数据正在实时更新
   - ✅ 可以切换不同页面（门诊、急诊等）
   - ✅ 图表正常显示

---

## 🎊 完成！

恭喜！你的应用已成功部署到云端：

```
🌐 前端地址: https://hospital-dashboard-xxx.vercel.app
🔧 后端地址: https://hospital-backend.onrender.com
💾 Redis: Upstash
```

### 你现在拥有：

- ✅ 全球访问（任何人都可以访问）
- ✅ 自动 HTTPS（安全加密）
- ✅ CDN 加速（访问速度快）
- ✅ 自动部署（推送代码即更新）
- ✅ 完全免费！

---

## 🚨 注意事项

### ⚠️ 免费套餐限制

1. **Render 会休眠**：
   - 15 分钟无访问，服务会休眠
   - 第一次访问会比较慢（约 30 秒）
   - **解决方法**：使用 [UptimeRobot](https://uptimerobot.com) 定期 ping

2. **Upstash 命令限制**：
   - 每天 10,000 次 Redis 命令
   - 对于演示项目足够使用
   - 超出后需要等第二天或升级

3. **Render 每月 750 小时**：
   - 一个月只有 720 小时，所以够用
   - 如果有多个服务可能不够

---

## 🔄 如何更新代码？

每次修改代码后，只需：

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Vercel 和 Render 会自动检测并重新部署！

---

## 🐛 遇到问题？

### 问题 1: 后端部署失败

**检查**：
- Render 日志中是否有错误
- 环境变量是否正确填写
- Build Command 是否正确

### 问题 2: 前端无法连接后端

**检查**：
1. 浏览器按 F12 → Console，查看错误
2. 确认 `VITE_API_BASE_URL` 正确
3. 确认后端 CORS 已更新为前端 URL
4. 确认后端 `/health` 能正常访问

### 问题 3: WebSocket 连接失败

**检查**：
1. `VITE_WS_BASE_URL` 必须是 `wss://` 开头
2. 浏览器控制台查看 WebSocket 错误
3. 后端日志查看是否有连接

---

## 📚 更多帮助

- 📖 **完整文档**：[FREE_CLOUD_DEPLOYMENT.md](./FREE_CLOUD_DEPLOYMENT.md)
- ✅ **详细检查清单**：[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
- 🔧 **API 文档**：[API.md](./API.md)

---

## 🎯 下一步

### 可选：配置防休眠

1. 注册 [UptimeRobot](https://uptimerobot.com)
2. 添加监控：
   - URL: `https://hospital-backend.onrender.com/health`
   - Interval: 5 minutes
3. 这样你的后端就不会休眠了！

### 可选：配置自定义域名

1. **Vercel**：Settings → Domains → 添加域名
2. **Render**：Settings → Custom Domain → 添加域名
3. 在域名提供商添加 CNAME 记录

### 可选：升级到付费版

如果需要更好的性能：

| 服务 | 免费版 | 付费版 | 价格 |
|------|--------|--------|------|
| Vercel | ✅ 够用 | 更多团队功能 | $20/月 |
| Render | 会休眠 | 不休眠 | $7/月 |
| Upstash | 10K 命令/天 | 无限 | $10/月 |

---

## 💡 提示

### 查看部署状态

- **Vercel**: https://vercel.com/dashboard → Deployments
- **Render**: https://dashboard.render.com → Logs

### 查看环境变量

- **Vercel**: Settings → Environment Variables
- **Render**: Environment 标签

### 重新部署

- **Vercel**: Deployments → 三个点 → Redeploy
- **Render**: Manual Deploy → Deploy latest commit

---

**开始你的免费云端部署之旅吧！** 🚀

有任何问题，查看 [完整文档](./FREE_CLOUD_DEPLOYMENT.md) 或 [检查清单](./DEPLOYMENT_CHECKLIST.md)。

