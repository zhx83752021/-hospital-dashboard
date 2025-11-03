# 医院数字化大屏 - 后端服务

## 简介

基于 Node.js + Express 的后端服务，为医院数字化大屏提供 RESTful API 接口和 WebSocket 实时数据推送。

## 技术栈

- **Node.js** >= 16
- **Express** - Web 框架
- **Socket.IO** - WebSocket 实时通信
- **CORS** - 跨域支持

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务

```bash
npm run dev
```

服务将在 `http://localhost:3000` 启动。

### 生产环境

```bash
npm start
```

## API 接口

### Dashboard 主页

| 接口 | 说明 |
|------|------|
| `GET /api/operation/data` | 运营数据 |
| `GET /api/bed/data` | 床位数据 |
| `GET /api/department/data` | 科室数据 |
| `GET /api/equipment/data` | 设备数据 |
| `GET /api/patient/trend` | 患者流量趋势 |

### 门诊页面

| 接口 | 说明 |
|------|------|
| `GET /api/outpatient/data` | 门诊综合数据 |
| `GET /api/outpatient/calling` | 叫号信息 |
| `GET /api/outpatient/departments` | 科室等候情况 |
| `GET /api/outpatient/doctors` | 医生出诊信息 |

### 急诊页面

| 接口 | 说明 |
|------|------|
| `GET /api/emergency/data` | 急诊综合数据 |
| `GET /api/emergency/stats` | 急诊统计数据 |
| `GET /api/emergency/queue` | 患者排队情况 |
| `GET /api/emergency/vehicles` | 急救车辆追踪 |
| `GET /api/emergency/staff` | 医护人员状态 |
| `GET /api/emergency/critical` | 危重症监控 |

### 其他

| 接口 | 说明 |
|------|------|
| `GET /api/health` | 健康检查 |
| `GET /api/queue/data` | 排队数据 |

详细 API 文档请查看: [docs/API.md](../docs/API.md)

## 项目结构

```
backend/
├── config/              # 配置文件
│   └── index.js
├── controllers/         # 控制器
│   ├── bedController.js
│   ├── departmentController.js
│   ├── emergencyController.js
│   ├── equipmentController.js
│   ├── operationController.js
│   ├── outpatientController.js
│   ├── patientController.js
│   └── queueController.js
├── routes/              # 路由
│   ├── bed.js
│   ├── department.js
│   ├── emergency.js
│   ├── equipment.js
│   ├── operation.js
│   ├── outpatient.js
│   ├── patient.js
│   └── queue.js
├── utils/               # 工具函数
│   ├── dataGenerator.js # 数据生成器
│   └── realtime.js      # 实时推送
├── server.js            # 服务器入口
├── package.json
└── README.md
```

## WebSocket 实时推送

连接地址: `ws://localhost:3000`

### 事件监听

```javascript
socket.on('realtime-update', (data) => {
  // data.type: 'operation' | 'bed' | 'message'
  // data.payload: 具体数据
})
```

### 推送频率

- 运营数据: 每 3 秒
- 床位数据: 每 5 秒
- 消息预警: 每 10 秒

## 环境变量

```bash
PORT=3000                    # 服务端口
NODE_ENV=development         # 运行环境
```

## 测试

### 健康检查

```bash
curl http://localhost:3000/api/health
```

### 批量测试

详见 [docs/API_TEST.md](../docs/API_TEST.md)

## 注意事项

1. 当前使用模拟数据，生产环境需连接真实数据源
2. 确保端口 3000 未被占用
3. Node.js 版本建议 >= 16

## 更新日志

查看 [CHANGELOG.md](../CHANGELOG.md) 了解版本更新详情。

## 许可证

MIT License

---

**版本**: 2.0.0  
**更新日期**: 2025-11-03

