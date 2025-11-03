# 医院数字化大屏 API 规范文档

## 📋 API 设计规范

### 1. 架构风格
- **RESTful API** - 遵循 REST 架构风格
- **资源导向** - 基于资源的 URL 设计

### 2. 技术栈
- **后端框架**: Express.js
- **数据格式**: JSON
- **通信协议**: HTTP/HTTPS + WebSocket

### 3. URL 设计规范

#### 基础路径
```
http://localhost:3000/api/{resource}/{action}
```

#### 资源命名规则
- 使用**小写英文单词**
- 使用**名词**表示资源
- 多个单词无连接符（如 `outpatient`，而非 `out-patient`）

#### 示例结构
```
/api/operation/data       # 运营数据
/api/bed/data            # 床位数据
/api/emergency/stats     # 急诊统计
/api/outpatient/calling  # 门诊叫号
```

### 4. HTTP 方法

当前项目仅使用：
- **GET** - 获取资源数据

> 注：项目为只读展示系统，暂不涉及 POST/PUT/DELETE 操作

### 5. 请求规范

#### 请求头
```http
GET /api/operation/data HTTP/1.1
Host: localhost:3000
Accept: application/json
```

#### 无需认证
当前版本无需 Token 或认证头

### 6. 响应规范

#### 响应头
```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Access-Control-Allow-Origin: *
```

#### 响应体格式

**成功响应** - 直接返回数据对象或数组

```json
{
  "outpatientCount": 362,
  "emergencyCount": 105,
  "inpatientCount": 394,
  "surgeryCount": 11,
  "revenue": 1035342
}
```

或数组格式：
```json
[
  {
    "id": 1,
    "name": "张**",
    "level": "critical",
    "waitTime": 25
  },
  {
    "id": 2,
    "name": "李**",
    "level": "urgent",
    "waitTime": 15
  }
]
```

**特点**：
- ✅ **无统一包装** - 直接返回业务数据
- ✅ **无 code/message 字段** - 简洁设计
- ✅ **无嵌套 data 字段** - 扁平化结构

#### 错误处理
当前实现较为简单，由 Express 默认错误处理机制处理

### 7. 状态码

| 状态码 | 说明 | 使用场景 |
|--------|------|---------|
| 200 | 成功 | 所有成功的 GET 请求 |
| 500 | 服务器错误 | Express 默认错误处理 |

### 8. 数据类型约定

#### 命名规范
- 使用 **camelCase**（小驼峰）命名
- 布尔值：`isOnline`, `hasData`
- 数量：`count`, `total` 后缀
- 时间：`time`, `date` 后缀

#### 常见字段
```javascript
{
  // 计数类
  "count": 123,           // 数量
  "total": 500,           // 总数
  
  // 状态类
  "status": "online",     // 字符串状态
  "level": "critical",    // 级别
  
  // 时间类
  "waitTime": 25,         // 等待时间（分钟）
  "timestamp": "2025-11-03T07:37:27.779Z",
  
  // 标识类
  "id": 1,                // 数字ID
  "number": "A001"        // 编号
}
```

### 9. 分页规范

**当前未实现分页**，所有列表接口直接返回完整数据

未来如需实现，建议：
```
GET /api/queue/data?page=1&size=20
```

### 10. 跨域配置 (CORS)

```javascript
// server.js
app.use(cors())  // 允许所有来源
```

响应头包含：
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST
```

---

## 📡 完整 API 清单

### Dashboard 主页

#### 1. 获取运营数据
```http
GET /api/operation/data
```

**响应示例**：
```json
{
  "outpatientCount": 362,
  "emergencyCount": 105,
  "inpatientCount": 394,
  "surgeryCount": 11,
  "revenue": 1035342
}
```

#### 2. 获取床位数据
```http
GET /api/bed/data
```

**响应示例**：
```json
{
  "totalBeds": 800,
  "occupiedBeds": 678,
  "availableBeds": 122,
  "occupancyRate": 84.75
}
```

#### 3. 获取科室数据
```http
GET /api/department/data
```

**响应示例**：
```json
[
  {
    "name": "心内科",
    "patientCount": 85,
    "bedCount": 120,
    "occupancyRate": 70.83
  }
]
```

#### 4. 获取设备数据
```http
GET /api/equipment/data
```

**响应示例**：
```json
[
  {
    "id": 1,
    "name": "CT-01",
    "type": "CT扫描仪",
    "status": "running",
    "usageRate": 75
  }
]
```

#### 5. 获取患者流量趋势
```http
GET /api/patient/trend
```

**响应示例**：
```json
{
  "labels": ["00:00", "04:00", "08:00", ...],
  "data": [45, 32, 78, ...]
}
```

---

### 门诊页面

#### 6. 获取门诊综合数据
```http
GET /api/outpatient/data
```

**响应示例**：
```json
{
  "totalToday": 856,
  "waiting": 125,
  "avgWaitTime": 18,
  "satisfaction": 92
}
```

#### 7. 获取叫号信息
```http
GET /api/outpatient/calling
```

**响应示例**：
```json
[
  {
    "department": "内科",
    "room": "101诊室",
    "currentNumber": "A023",
    "doctor": "王医生"
  }
]
```

#### 8. 获取科室等候情况
```http
GET /api/outpatient/departments
```

**响应示例**：
```json
[
  {
    "name": "心内科",
    "waiting": 15,
    "avgWaitTime": 25
  }
]
```

#### 9. 获取医生出诊信息
```http
GET /api/outpatient/doctors
```

**响应示例**：
```json
[
  {
    "name": "王医生",
    "department": "心内科",
    "room": "301",
    "status": "在诊"
  }
]
```

---

### 急诊页面

#### 10. 获取急诊综合数据
```http
GET /api/emergency/data
```

**响应示例**：
```json
{
  "totalToday": 278,
  "waiting": 38,
  "critical": 5,
  "bedOccupancy": 92
}
```

#### 11. 获取急诊统计数据
```http
GET /api/emergency/stats
```

**响应示例**：
```json
{
  "totalToday": 256,
  "waiting": 38,
  "critical": 4,
  "bedOccupancy": 95,
  "processed": 265,
  "avgWaitTime": 24
}
```

#### 12. 获取患者排队情况
```http
GET /api/emergency/queue
```

**响应示例**：
```json
[
  {
    "id": 1,
    "number": "A001",
    "name": "张**",
    "level": "critical",
    "levelText": "危重",
    "waitTime": 5
  }
]
```

#### 13. 获取急救车辆追踪
```http
GET /api/emergency/vehicles
```

**响应示例**：
```json
[
  {
    "id": 1,
    "name": "急救车1号",
    "status": "出诊中",
    "location": "距离医院2.3公里"
  }
]
```

#### 14. 获取医护人员状态
```http
GET /api/emergency/staff
```

**响应示例**：
```json
[
  {
    "id": 1,
    "name": "王医生",
    "role": "主任医师",
    "status": "online"
  }
]
```

#### 15. 获取危重症监控
```http
GET /api/emergency/critical
```

**响应示例**：
```json
[
  {
    "id": 1,
    "name": "张**",
    "age": 67,
    "heartRate": 115,
    "bloodPressure": "165/98",
    "temperature": "37.8"
  }
]
```

---

### 其他

#### 16. 获取排队数据
```http
GET /api/queue/data
```

#### 17. 健康检查
```http
GET /api/health
```

**响应示例**：
```json
{
  "status": "ok",
  "timestamp": "2025-11-03T07:37:27.779Z"
}
```

---

## 🔌 WebSocket 实时推送

### 连接地址
```javascript
const socket = io('http://localhost:3000')
```

### 事件监听
```javascript
// 监听运营数据更新
socket.on('operationData', (data) => {
  console.log('实时运营数据:', data)
})

// 监听床位数据更新
socket.on('bedData', (data) => {
  console.log('实时床位数据:', data)
})

// 监听科室数据更新
socket.on('departmentData', (data) => {
  console.log('实时科室数据:', data)
})

// 监听设备数据更新
socket.on('equipmentData', (data) => {
  console.log('实时设备数据:', data)
})

// 监听患者趋势更新
socket.on('patientTrend', (data) => {
  console.log('实时患者趋势:', data)
})
```

### 推送频率
- 默认 3-5 秒推送一次
- 可在 `backend/utils/realtime.js` 中调整

---

## 🎯 API 设计特点总结

### 优点
✅ **简洁直观** - URL 语义清晰，易于理解  
✅ **扁平化结构** - 响应数据无多余包装  
✅ **统一格式** - 所有接口返回 JSON  
✅ **RESTful 风格** - 符合 REST 设计原则  
✅ **实时推送** - WebSocket 支持数据实时更新  

### 改进建议（未来版本）
⚠️ 添加统一错误响应格式  
⚠️ 实现请求参数验证  
⚠️ 添加认证授权机制  
⚠️ 实现分页功能  
⚠️ 添加请求日志与监控  
⚠️ API 版本控制（如 `/api/v1/`）  

---

**文档版本**: v1.0  
**更新日期**: 2025-11-03  
**维护者**: 开发团队

