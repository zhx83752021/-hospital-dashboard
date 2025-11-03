# API 接口文档

## 基础信息

- **Base URL**: `http://localhost:3000/api`
- **数据格式**: JSON
- **字符编码**: UTF-8

## 接口列表

### 1. 运营数据

#### 获取运营数据

**接口**: `GET /operation/data`

**描述**: 获取医院实时运营数据

**响应示例**:
```json
{
  "outpatientCount": 286,
  "emergencyCount": 98,
  "inpatientCount": 456,
  "surgeryCount": 23,
  "revenue": 856000
}
```

**字段说明**:
- `outpatientCount`: 门诊人次
- `emergencyCount`: 急诊人次
- `inpatientCount`: 住院人数
- `surgeryCount`: 手术台次
- `revenue`: 今日收入（单位：元）

---

### 2. 床位数据

#### 获取床位数据

**接口**: `GET /bed/data`

**描述**: 获取医院床位使用情况

**响应示例**:
```json
{
  "total": 800,
  "occupied": 678,
  "available": 122,
  "rate": 85
}
```

**字段说明**:
- `total`: 总床位数
- `occupied`: 已占用床位
- `available`: 可用床位
- `rate`: 使用率（百分比）

---

### 3. 科室数据

#### 获取科室数据

**接口**: `GET /department/data`

**描述**: 获取各科室工作负荷数据

**响应示例**:
```json
[
  {
    "name": "心内科",
    "workload": 125
  },
  {
    "name": "骨科",
    "workload": 98
  }
]
```

**字段说明**:
- `name`: 科室名称
- `workload`: 工作负荷值

---

### 4. 设备数据

#### 获取设备数据

**接口**: `GET /equipment/data`

**描述**: 获取医疗设备状态信息

**响应示例**:
```json
[
  {
    "id": 1,
    "name": "CT扫描仪-1",
    "location": "影像科1楼",
    "status": "success",
    "usageRate": 85
  }
]
```

**字段说明**:
- `id`: 设备ID
- `name`: 设备名称
- `location`: 设备位置
- `status`: 设备状态 (`success`正常 | `warning`维护 | `danger`故障 | `info`空闲)
- `usageRate`: 使用率（百分比）

---

### 5. 患者趋势

#### 获取患者流量趋势

**接口**: `GET /patient/trend`

**描述**: 获取24小时患者流量趋势数据

**响应示例**:
```json
[
  {
    "time": "0:00",
    "outpatient": 45,
    "emergency": 18,
    "inpatient": 456
  },
  {
    "time": "1:00",
    "outpatient": 32,
    "emergency": 12,
    "inpatient": 458
  }
]
```

**字段说明**:
- `time`: 时间点
- `outpatient`: 门诊人次
- `emergency`: 急诊人次
- `inpatient`: 住院人数

---

### 6. 急诊数据

#### 6.1 获取急诊综合数据

**接口**: `GET /emergency/data`

**描述**: 获取急诊科相关数据

**响应示例**:
```json
{
  "totalToday": 286,
  "waiting": 32,
  "critical": 5,
  "bedOccupancy": 92
}
```

**字段说明**:
- `totalToday`: 今日急诊总人次
- `waiting`: 当前等候患者数
- `critical`: 危重症患者数
- `bedOccupancy`: 床位占用率（百分比）

#### 6.2 获取急诊统计数据

**接口**: `GET /emergency/stats`

**描述**: 获取急诊详细统计数据

**响应示例**:
```json
{
  "totalToday": 286,
  "waiting": 32,
  "critical": 5,
  "bedOccupancy": 92,
  "processed": 254,
  "avgWaitTime": 18
}
```

**字段说明**:
- `totalToday`: 今日急诊总人次
- `waiting`: 当前等候患者数
- `critical`: 危重症患者数
- `bedOccupancy`: 床位占用率（百分比）
- `processed`: 已处理人数
- `avgWaitTime`: 平均等待时间（分钟）

#### 6.3 获取急诊患者排队情况

**接口**: `GET /emergency/queue`

**描述**: 获取急诊患者排队详情

**响应示例**:
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

**字段说明**:
- `id`: 患者ID
- `number`: 排队号码
- `name`: 患者姓名（脱敏）
- `level`: 紧急级别 (`critical`危重 | `urgent`紧急 | `normal`普通)
- `levelText`: 级别文本
- `waitTime`: 等待时间（分钟）

#### 6.4 获取急救车辆追踪

**接口**: `GET /emergency/vehicles`

**描述**: 获取急救车辆实时位置信息

**响应示例**:
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

**字段说明**:
- `id`: 车辆ID
- `name`: 车辆名称
- `status`: 状态（出诊中、待命、维护中、返回中）
- `location`: 位置信息

#### 6.5 获取医护人员在岗状态

**接口**: `GET /emergency/staff`

**描述**: 获取急诊科医护人员在岗状态

**响应示例**:
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

**字段说明**:
- `id`: 人员ID
- `name`: 姓名
- `role`: 职位
- `status`: 状态 (`online`在岗 | `offline`休息)

#### 6.6 获取危重症患者监控

**接口**: `GET /emergency/critical`

**描述**: 获取危重症患者生命体征监控数据

**响应示例**:
```json
[
  {
    "id": 1,
    "name": "周**",
    "age": 68,
    "heartRate": 125,
    "bloodPressure": "180/110",
    "temperature": "38.5"
  }
]
```

**字段说明**:
- `id`: 患者ID
- `name`: 患者姓名（脱敏）
- `age`: 年龄
- `heartRate`: 心率（次/分钟）
- `bloodPressure`: 血压
- `temperature`: 体温（℃）

---

### 7. 门诊数据

#### 7.1 获取门诊综合数据

**接口**: `GET /outpatient/data`

**描述**: 获取门诊相关数据

**响应示例**:
```json
{
  "totalToday": 568,
  "currentWaiting": 125,
  "departments": [
    {
      "name": "内科",
      "waiting": 23
    }
  ]
}
```

**字段说明**:
- `totalToday`: 今日门诊总人次
- `currentWaiting`: 当前等候总人数
- `departments`: 各科室等候情况
  - `name`: 科室名称
  - `waiting`: 等候人数

#### 7.2 获取叫号信息

**接口**: `GET /outpatient/calling`

**描述**: 获取当前叫号信息

**响应示例**:
```json
{
  "number": "A108",
  "room": "3号诊室"
}
```

**字段说明**:
- `number`: 当前叫号号码
- `room`: 诊室号

#### 7.3 获取科室等候情况

**接口**: `GET /outpatient/departments`

**描述**: 获取各科室详细等候情况

**响应示例**:
```json
[
  {
    "name": "心内科",
    "doctor": "王主任",
    "waiting": 15,
    "avgTime": 12
  }
]
```

**字段说明**:
- `name`: 科室名称
- `doctor`: 当前出诊医生
- `waiting`: 等候人数
- `avgTime`: 平均等待时间（分钟）

#### 7.4 获取医生出诊信息

**接口**: `GET /outpatient/doctors`

**描述**: 获取医生出诊状态信息

**响应示例**:
```json
[
  {
    "id": 1,
    "name": "王建国",
    "department": "心内科",
    "title": "主任医师",
    "status": "working"
  }
]
```

**字段说明**:
- `id`: 医生ID
- `name`: 医生姓名
- `department`: 所属科室
- `title`: 职称
- `status`: 状态 (`working`出诊中 | `rest`休息)

---

### 8. 排队数据

#### 获取排队数据

**接口**: `GET /queue/data`

**描述**: 获取患者排队叫号信息

**响应示例**:
```json
{
  "current": "A108",
  "waiting": [
    {
      "number": "A109",
      "department": "内科",
      "status": "waiting"
    }
  ]
}
```

**字段说明**:
- `current`: 当前叫号
- `waiting`: 等候队列
  - `number`: 号码
  - `department`: 科室
  - `status`: 状态

---

### 9. 健康检查

#### 健康检查

**接口**: `GET /health`

**描述**: 检查服务器健康状态

**响应示例**:
```json
{
  "status": "ok",
  "timestamp": "2025-10-29T14:30:00.000Z"
}
```

---

## WebSocket 实时推送

### 连接

```javascript
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000')
```

### 事件监听

#### realtime-update

实时数据更新事件

**事件数据格式**:

```javascript
{
  type: 'operation' | 'bed' | 'message',
  payload: { ... }
}
```

**示例**:

```javascript
socket.on('realtime-update', (data) => {
  if (data.type === 'operation') {
    // 处理运营数据更新
    console.log(data.payload)
  } else if (data.type === 'bed') {
    // 处理床位数据更新
    console.log(data.payload)
  } else if (data.type === 'message') {
    // 处理消息预警
    console.log(data.payload)
  }
})
```

**消息类型**:

1. **运营数据** (`type: 'operation'`)
   - 推送频率: 每3秒
   - 数据结构: 同 `/operation/data` 接口

2. **床位数据** (`type: 'bed'`)
   - 推送频率: 每5秒
   - 数据结构: 同 `/bed/data` 接口

3. **消息预警** (`type: 'message'`)
   - 推送频率: 每10秒
   - 数据结构:
   ```json
   {
     "level": "danger",
     "title": "急诊患者激增，请增派人手",
     "timestamp": "2025-10-29T14:30:00.000Z"
   }
   ```

---

## 错误处理

### 错误响应格式

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "错误描述信息"
  }
}
```

### HTTP 状态码

- `200` - 成功
- `400` - 请求参数错误
- `401` - 未授权
- `404` - 资源不存在
- `500` - 服务器内部错误

---

## 注意事项

1. 所有时间戳采用 ISO 8601 格式
2. 数字类型的数据已做四舍五入处理
3. 实时数据为模拟数据，用于演示和测试
4. 生产环境需要连接真实的数据源

---

**文档版本**: v2.0  
**更新日期**: 2025-11-03

