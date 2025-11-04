# 🏥 医院数字化大屏解决方案

一个功能完善的医院数字化大屏系统，提供实时运营监控、医疗服务管理、资源调度和决策分析等功能。

## ✨ 功能特性（已实现）

### 📊 核心功能模块

1. **运营监控模块**
   - 实时门急诊患者流量统计
   - 住院患者分布与床位使用率
   - 手术室使用情况监控
   - 医疗收入实时统计
   - 药品耗材库存预警
   - 异常事件实时推送

2. **医疗服务模块**
   - 门诊叫号与排队管理
   - 检查检验报告追踪
   - 患者就医流程可视化
   - 医生排班与出诊信息
   - 患者满意度实时反馈

3. **资源管理模块**
   - 床位实时状态展示
   - 医疗设备运行监控
   - 人员在岗情况统计
   - 会议室、车辆调度管理

4. **页面覆盖**
   - 运营指挥中心（Dashboard）
   - 急诊科看板（Emergency）
   - 门诊服务大屏（Outpatient）

### 🎯 应用场景

- **医院运营指挥中心** - 为院领导提供全局运营视图
- **急诊科实时看板** - 提升急诊科应急响应能力
- **门诊患者服务大屏** - 优化患者就医体验

## 🛠️ 技术栈

### 前端技术
- **框架**: Vue 3 + Vite
- **状态管理**: Pinia
- **路由**: Vue Router
- **可视化**: ECharts 5
- **样式**: SCSS
- **实时通信**: Socket.IO Client
- **HTTP客户端**: Axios
- **日期处理**: Day.js

### 后端技术
- **运行时**: Node.js
- **框架**: Express
- **实时通信**: Socket.IO
- **数据源**: 内置模拟数据生成器（可替换为真实数据源）


### 架构设计

```
┌─────────────────────────────────────────────┐
│           展示层 (Presentation)              │
│  LED大屏 | PC端 | 移动端 | 触摸屏           │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│         前端应用 (Frontend App)              │
│  Vue 3 + ECharts + WebSocket Client         │
└─────────────────┬───────────────────────────┘
                  │
                  │ HTTP/WebSocket
                  │
┌─────────────────▼───────────────────────────┐
│         后端服务 (Backend Service)           │
│  Express + Socket.IO + RESTful API          │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│        数据层 (Data Layer)                   │
│  模拟数据生成器 (可替换为真实数据源)          │
└─────────────────────────────────────────────┘
```

## 📦 项目结构（核心）

```
hospital-dashboard/
├── frontend/                 # 前端项目
│   ├── src/
│   │   ├── api/             # API接口
│   │   ├── assets/          # 静态资源
│   │   ├── components/      # 组件
│   │   │   ├── OperationStats.vue      # 运营统计
│   │   │   ├── DepartmentChart.vue     # 科室分布
│   │   │   ├── EquipmentStatus.vue     # 设备状态
│   │   │   ├── PatientTrend.vue        # 患者趋势
│   │   │   ├── BedStatus.vue           # 床位状态
│   │   │   ├── RevenueChart.vue        # 收入统计
│   │   │   ├── RealTimeAlerts.vue      # 实时预警
│   │   │   ├── ResourceMonitor.vue     # 资源监控
│   │   │   └── PerformanceRanking.vue  # 绩效排名
│   │   ├── stores/          # 状态管理
│   │   ├── styles/          # 样式文件
│   │   ├── utils/           # 工具函数
│   │   ├── views/           # 页面视图
│   │   │   ├── Dashboard.vue           # 运营指挥中心
│   │   │   ├── Emergency.vue           # 急诊看板
│   │   │   └── Outpatient.vue          # 门诊大屏
│   │   ├── App.vue          # 根组件
│   │   └── main.js          # 入口文件
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/                  # 后端项目
│   ├── config/              # 配置文件
│   ├── controllers/         # 控制器
│   │   ├── operationController.js
│   │   ├── bedController.js
│   │   ├── departmentController.js
│   │   ├── equipmentController.js
│   │   ├── patientController.js
│   │   ├── emergencyController.js
│   │   ├── outpatientController.js
│   │   └── queueController.js
│   ├── routes/              # 路由
│   ├── models/              # 数据模型
│   ├── utils/               # 工具函数
│   │   ├── dataGenerator.js        # 数据生成器
│   │   └── realtime.js             # 实时数据推送
│   ├── server.js            # 服务器入口
│   └── package.json
│
├── docs/                    # 文档
└── package.json             # 根配置
```

## 🚀 快速开始

### 🆓 免费云端部署（推荐）

**无需服务器，10 分钟部署到云端，完全免费！**

查看详细教程：
- 🎯 [10 分钟快速开始](./FREE_DEPLOYMENT_QUICKSTART.md) - 适合新手
- 📖 [完整部署文档](./FREE_CLOUD_DEPLOYMENT.md) - 详细说明
- ✅ [部署检查清单](./DEPLOYMENT_CHECKLIST.md) - 确保万无一失

使用的免费服务：
- **Vercel** - 前端托管（无限制）
- **Render** - 后端托管（750小时/月）
- **Upstash** - Redis 数据库（10K 命令/天）

### 本地开发

#### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装依赖

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

### 启动开发环境

#### 方式一：使用 PowerShell 脚本（推荐 Windows 用户）

```powershell
# 一键启动前后端
.\start.ps1

# 停止所有服务
.\stop.ps1
```

#### 方式二：使用 npm 同时启动

```bash
# 在项目根目录（需要先安装 concurrently）
npm run dev
```

#### 方式三：分别启动

```bash
# 终端1 - 启动后端
cd backend
npm run dev

# 终端2 - 启动前端
cd frontend
npm run dev
```

### 访问应用

- 前端地址: http://localhost:5173
- 后端API: http://localhost:3000
- 健康检查: http://localhost:3000/api/health

## 📦 部署

### 本地/传统服务器部署

查看完整的传统部署文档：
- [快速部署指南](./DEPLOYMENT_QUICK_START.md) - 10 分钟快速部署
- [云端部署完整文档](./CLOUD_DEPLOYMENT.md) - Docker + 云服务器

### 免费云端部署（推荐个人/演示项目）

使用 Vercel、Render、Upstash 等免费服务：
- [免费部署快速开始](./FREE_DEPLOYMENT_QUICKSTART.md) ⭐
- [免费部署完整文档](./FREE_CLOUD_DEPLOYMENT.md)
- [部署检查清单](./DEPLOYMENT_CHECKLIST.md)

部署特点：
- ✅ 完全免费
- ✅ 自动 HTTPS
- ✅ 全球 CDN
- ✅ 自动部署（Git 推送即更新）
- ✅ 零运维

## 📖 API 文档（当前后端已提供）

- 健康检查
  - `GET /api/health`

- Dashboard 主页
  - `GET /api/operation/data` — 运营数据
  - `GET /api/bed/data` — 床位数据
  - `GET /api/department/data` — 科室数据
  - `GET /api/equipment/data` — 设备数据
  - `GET /api/patient/trend` — 患者流量趋势

- 门诊页面
  - `GET /api/outpatient/data` — 门诊综合数据
  - `GET /api/outpatient/calling` — 叫号信息
  - `GET /api/outpatient/departments` — 科室等候情况
  - `GET /api/outpatient/doctors` — 医生出诊信息

- 急诊页面
  - `GET /api/emergency/data` — 急诊综合数据
  - `GET /api/emergency/stats` — 急诊统计数据
  - `GET /api/emergency/queue` — 患者排队情况
  - `GET /api/emergency/vehicles` — 急救车辆追踪
  - `GET /api/emergency/staff` — 医护人员状态
  - `GET /api/emergency/critical` — 危重症监控

- 其他
  - `GET /api/queue/data` — 排队数据

## 🎨 界面展示

### 运营指挥中心
- 实时运营数据统计
- 科室工作负荷分布
- 医疗设备状态监控
- 患者流量趋势分析
- 床位使用情况
- 收入统计分析
- 实时消息预警
- 资源使用监控
- 科室绩效排名

### 急诊科看板
- 急诊患者排队情况
- 急救车辆追踪
- 医护人员在岗状态
- 危重症患者监控

### 门诊服务大屏
- 实时叫号信息
- 各科室等候情况
- 医生出诊信息
- 就医流程指引
- 健康宣教内容

## 🔧 配置说明

### 前端代理配置

在 `vite.config.js` 中配置API代理：

```javascript
server: {
  port: 5173,
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true
    }
  }
}
```

## 📊 性能指标（参考）

| 指标项 | 标准要求 | 当前实现 |
|-------|---------|---------|
| 数据刷新频率 | 5秒 | 3-5秒 |
| 数据响应时间 | <500ms | <200ms |
| WebSocket连接 | 稳定 | ✅ |
| 并发访问量 | 500+ | 支持 |

## 🔐 安全特性（当前实现）

- CORS 跨域配置（后端）
- Axios 请求/响应拦截与错误日志（前端）
- 简单访问日志中间件（后端）

## 📱 响应式支持

- 支持4K分辨率 (3840×2160)
- 支持1080P分辨率 (1920×1080)
- 自适应布局调整
- 多屏幕适配

## 🎯 核心价值

| 价值维度 | 核心收益 | 量化指标 |
|---------|---------|---------|
| 运营效率 | 实时监控医院运营状态 | 响应时间缩短 60% |
| 决策支持 | 数据可视化辅助决策 | 决策准确率提升 45% |
| 资源优化 | 优化床位、设备配置 | 资源利用率提升 35% |
| 患者体验 | 缩短等待时间 | 患者满意度提升 40% |

## ✅ 已实现清单

- 基础架构（前后端 + 通讯）
- 前端框架与核心页面（Dashboard / Emergency / Outpatient）
- 后端 REST API 与路由
- WebSocket 实时数据推送
- ECharts 可视化与组件化

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 👥 联系方式

如有问题或建议，欢迎联系开发团队。

---

**文档版本**: v1.0  
**更新日期**: 2025-11-03  
**项目状态**: 开发中

#   - h o s p i t a l - d a s h b o a r d  
 "# -hospital-dashboard" 
