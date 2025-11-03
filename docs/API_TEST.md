# API 接口测试指南

## 快速测试

### 启动后端服务

```bash
cd hospital-dashboard/backend
npm run dev
```

### 测试方法

可以使用以下任一方法测试 API：

1. **浏览器直接访问**（GET 请求）
2. **Postman / Insomnia**（推荐）
3. **curl 命令**
4. **前端页面**

---

## Dashboard 主页相关接口

### 1. 运营数据
```bash
curl http://localhost:3000/api/operation/data
```

### 2. 床位数据
```bash
curl http://localhost:3000/api/bed/data
```

### 3. 科室数据
```bash
curl http://localhost:3000/api/department/data
```

### 4. 设备数据
```bash
curl http://localhost:3000/api/equipment/data
```

### 5. 患者流量趋势
```bash
curl http://localhost:3000/api/patient/trend
```

---

## 门诊页面相关接口

### 6. 门诊综合数据
```bash
curl http://localhost:3000/api/outpatient/data
```

### 7. 叫号信息
```bash
curl http://localhost:3000/api/outpatient/calling
```

### 8. 科室等候情况
```bash
curl http://localhost:3000/api/outpatient/departments
```

### 9. 医生出诊信息
```bash
curl http://localhost:3000/api/outpatient/doctors
```

---

## 急诊页面相关接口

### 10. 急诊综合数据
```bash
curl http://localhost:3000/api/emergency/data
```

### 11. 急诊统计数据
```bash
curl http://localhost:3000/api/emergency/stats
```

### 12. 急诊患者排队情况
```bash
curl http://localhost:3000/api/emergency/queue
```

### 13. 急救车辆追踪
```bash
curl http://localhost:3000/api/emergency/vehicles
```

### 14. 医护人员在岗状态
```bash
curl http://localhost:3000/api/emergency/staff
```

### 15. 危重症患者监控
```bash
curl http://localhost:3000/api/emergency/critical
```

---

## 其他接口

### 16. 健康检查
```bash
curl http://localhost:3000/api/health
```

### 17. 排队数据
```bash
curl http://localhost:3000/api/queue/data
```

---

## 批量测试脚本

### Windows (PowerShell)

创建文件 `test-api.ps1`:

```powershell
$baseUrl = "http://localhost:3000/api"

Write-Host "====== 测试 Dashboard 主页接口 ======" -ForegroundColor Green
Invoke-RestMethod "$baseUrl/operation/data"
Invoke-RestMethod "$baseUrl/bed/data"
Invoke-RestMethod "$baseUrl/department/data"
Invoke-RestMethod "$baseUrl/equipment/data"

Write-Host "`n====== 测试门诊页面接口 ======" -ForegroundColor Green
Invoke-RestMethod "$baseUrl/outpatient/data"
Invoke-RestMethod "$baseUrl/outpatient/calling"
Invoke-RestMethod "$baseUrl/outpatient/departments"
Invoke-RestMethod "$baseUrl/outpatient/doctors"

Write-Host "`n====== 测试急诊页面接口 ======" -ForegroundColor Green
Invoke-RestMethod "$baseUrl/emergency/data"
Invoke-RestMethod "$baseUrl/emergency/stats"
Invoke-RestMethod "$baseUrl/emergency/queue"
Invoke-RestMethod "$baseUrl/emergency/vehicles"
Invoke-RestMethod "$baseUrl/emergency/staff"
Invoke-RestMethod "$baseUrl/emergency/critical"

Write-Host "`n====== 所有接口测试完成 ======" -ForegroundColor Green
```

运行：
```bash
powershell -ExecutionPolicy Bypass -File test-api.ps1
```

### Linux / Mac (Bash)

创建文件 `test-api.sh`:

```bash
#!/bin/bash

BASE_URL="http://localhost:3000/api"

echo "====== 测试 Dashboard 主页接口 ======"
curl -s "$BASE_URL/operation/data" | jq
curl -s "$BASE_URL/bed/data" | jq
curl -s "$BASE_URL/department/data" | jq
curl -s "$BASE_URL/equipment/data" | jq
curl -s "$BASE_URL/patient/trend" | jq

echo -e "\n====== 测试门诊页面接口 ======"
curl -s "$BASE_URL/outpatient/data" | jq
curl -s "$BASE_URL/outpatient/calling" | jq
curl -s "$BASE_URL/outpatient/departments" | jq
curl -s "$BASE_URL/outpatient/doctors" | jq

echo -e "\n====== 测试急诊页面接口 ======"
curl -s "$BASE_URL/emergency/data" | jq
curl -s "$BASE_URL/emergency/stats" | jq
curl -s "$BASE_URL/emergency/queue" | jq
curl -s "$BASE_URL/emergency/vehicles" | jq
curl -s "$BASE_URL/emergency/staff" | jq
curl -s "$BASE_URL/emergency/critical" | jq

echo -e "\n====== 测试健康检查 ======"
curl -s "$BASE_URL/health" | jq

echo -e "\n====== 所有接口测试完成 ======"
```

运行：
```bash
chmod +x test-api.sh
./test-api.sh
```

---

## 预期结果

所有接口都应该返回：
- ✅ HTTP 状态码 200
- ✅ JSON 格式的数据
- ✅ 符合 API 文档中定义的数据结构

## 常见问题

### 1. 连接失败
- 检查后端服务是否已启动
- 确认端口 3000 没有被占用
- 检查防火墙设置

### 2. 数据返回为空
- 这是正常的，因为后端使用的是模拟数据生成器
- 每次请求都会生成新的随机数据

### 3. CORS 错误
- 后端已配置 CORS，允许所有来源访问
- 如果仍有问题，检查 server.js 中的 CORS 配置

---

## 集成测试

启动完整系统：

```bash
# 启动后端
cd backend
npm run dev

# 新开终端，启动前端
cd frontend
npm run dev
```

访问前端页面：
- Dashboard 主页: http://localhost:5173/
- 门诊页面: http://localhost:5173/#/outpatient
- 急诊页面: http://localhost:5173/#/emergency

---

**测试完成日期**: 2025-11-03

