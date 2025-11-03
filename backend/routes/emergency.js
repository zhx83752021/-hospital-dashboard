import express from 'express'
import { 
  getEmergencyData, 
  getEmergencyStats, 
  getQueueList, 
  getVehicles, 
  getStaffStatus, 
  getCriticalPatients 
} from '../controllers/emergencyController.js'

const router = express.Router()

// 急诊综合数据（保留兼容性）
router.get('/data', getEmergencyData)

// 急诊统计数据
router.get('/stats', getEmergencyStats)

// 急诊患者排队情况
router.get('/queue', getQueueList)

// 急救车辆追踪
router.get('/vehicles', getVehicles)

// 医护人员在岗状态
router.get('/staff', getStaffStatus)

// 危重症患者监控
router.get('/critical', getCriticalPatients)

export default router

