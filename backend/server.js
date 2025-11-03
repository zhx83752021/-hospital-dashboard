import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import bodyParser from 'body-parser'
import operationRoutes from './routes/operation.js'
import bedRoutes from './routes/bed.js'
import departmentRoutes from './routes/department.js'
import equipmentRoutes from './routes/equipment.js'
import patientRoutes from './routes/patient.js'
import emergencyRoutes from './routes/emergency.js'
import outpatientRoutes from './routes/outpatient.js'
import queueRoutes from './routes/queue.js'
import { startRealtimeDataPush } from './utils/realtime.js'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

const PORT = 3000

// 中间件
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 日志中间件
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
})

// API 路由
app.use('/api/operation', operationRoutes)
app.use('/api/bed', bedRoutes)
app.use('/api/department', departmentRoutes)
app.use('/api/equipment', equipmentRoutes)
app.use('/api/patient', patientRoutes)
app.use('/api/emergency', emergencyRoutes)
app.use('/api/outpatient', outpatientRoutes)
app.use('/api/queue', queueRoutes)

// 根路径提示
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>医院数字化大屏 - 后端服务</title>
      <style>
        body {
          font-family: 'Microsoft YaHei', Arial, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .container {
          background: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          text-align: center;
          max-width: 600px;
        }
        h1 { color: #667eea; margin-bottom: 20px; }
        .status { color: #28a745; font-size: 18px; margin: 20px 0; }
        .info { color: #666; margin: 15px 0; line-height: 1.6; }
        .link {
          display: inline-block;
          margin-top: 20px;
          padding: 12px 30px;
          background: #667eea;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          transition: background 0.3s;
        }
        .link:hover { background: #5568d3; }
        .api-list {
          text-align: left;
          margin: 20px 0;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 5px;
        }
        .api-list li { margin: 8px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🏥 医院数字化大屏后端服务</h1>
        <div class="status">✅ 服务运行正常</div>
        <div class="info">
          <p><strong>后端API地址：</strong> http://localhost:${PORT}</p>
          <p><strong>前端访问地址：</strong> http://localhost:5173</p>
        </div>
        <div class="info">
          <strong>可用的API接口：</strong>
          <ul class="api-list">
            <li>GET /api/health - 健康检查</li>
            <li><strong>Dashboard主页:</strong></li>
            <li>GET /api/operation/data - 运营数据</li>
            <li>GET /api/bed/data - 床位数据</li>
            <li>GET /api/department/data - 科室数据</li>
            <li>GET /api/equipment/data - 设备数据</li>
            <li>GET /api/patient/trend - 患者流量趋势</li>
            <li><strong>门诊页面:</strong></li>
            <li>GET /api/outpatient/data - 门诊综合数据</li>
            <li>GET /api/outpatient/calling - 叫号信息</li>
            <li>GET /api/outpatient/departments - 科室等候情况</li>
            <li>GET /api/outpatient/doctors - 医生出诊信息</li>
            <li><strong>急诊页面:</strong></li>
            <li>GET /api/emergency/data - 急诊综合数据</li>
            <li>GET /api/emergency/stats - 急诊统计数据</li>
            <li>GET /api/emergency/queue - 患者排队情况</li>
            <li>GET /api/emergency/vehicles - 急救车辆追踪</li>
            <li>GET /api/emergency/staff - 医护人员状态</li>
            <li>GET /api/emergency/critical - 危重症监控</li>
            <li><strong>其他:</strong></li>
            <li>GET /api/queue/data - 排队数据</li>
          </ul>
        </div>
        <a href="http://localhost:5173" class="link">访问前端页面 →</a>
      </div>
    </body>
    </html>
  `)
})

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// WebSocket 连接处理
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
})

// 启动实时数据推送
startRealtimeDataPush(io)

// 启动服务器
httpServer.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════╗
║                                                   ║
║   🏥 医院数字化大屏后端服务已启动                   ║
║                                                   ║
║   端口: ${PORT}                                      ║
║   时间: ${new Date().toLocaleString()}       ║
║                                                   ║
╚═══════════════════════════════════════════════════╝
  `)
})

export { io }

