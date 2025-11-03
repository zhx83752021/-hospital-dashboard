import express from 'express'
import { 
  getOutpatientData, 
  getCallingInfo, 
  getDepartmentQueue, 
  getDoctorSchedule 
} from '../controllers/outpatientController.js'

const router = express.Router()

// 门诊综合数据
router.get('/data', getOutpatientData)

// 叫号信息
router.get('/calling', getCallingInfo)

// 科室等候情况
router.get('/departments', getDepartmentQueue)

// 医生出诊信息
router.get('/doctors', getDoctorSchedule)

export default router

