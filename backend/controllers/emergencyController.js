import { generateRandomNumber, randomChoice } from '../utils/dataGenerator.js'

// 患者姓名遮蔽列表
const patientNames = ['张**', '李**', '王**', '赵**', '刘**', '周**', '吴**', '郑**', '钱**', '孙**']
const doctorNames = ['王医生', '李护士', '张医生', '刘护士', '陈医生', '赵护士', '孙医生', '周护士', '吴医生']
const roles = ['主任医师', '护士长', '主治医师', '护士', '住院医师', '副主任医师']

// 获取急诊统计数据
export const getEmergencyStats = (req, res) => {
  const data = {
    totalToday: generateRandomNumber(250, 300),
    waiting: generateRandomNumber(25, 40),
    critical: generateRandomNumber(4, 8),
    bedOccupancy: generateRandomNumber(85, 95),
    processed: generateRandomNumber(220, 270),
    avgWaitTime: generateRandomNumber(15, 25)
  }
  res.json(data)
}

// 获取急诊患者排队情况
export const getQueueList = (req, res) => {
  const levels = [
    { level: 'critical', levelText: '危重' },
    { level: 'urgent', levelText: '紧急' },
    { level: 'normal', levelText: '普通' }
  ]
  
  const data = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    number: `A${String(index + 1).padStart(3, '0')}`,
    name: randomChoice(patientNames),
    level: randomChoice(levels).level,
    levelText: randomChoice(levels).levelText,
    waitTime: generateRandomNumber(5, 40)
  }))
  
  res.json(data)
}

// 获取急救车辆追踪
export const getVehicles = (req, res) => {
  const statuses = ['出诊中', '待命', '维护中', '返回中']
  const locations = [
    '距离医院2.3公里', 
    '医院待命区', 
    '维修车间', 
    '距离医院0.8公里', 
    '距离医院4.5公里',
    '距离医院1.2公里'
  ]
  
  const data = Array.from({ length: 6 }, (_, index) => ({
    id: index + 1,
    name: `急救车${index + 1}号`,
    status: randomChoice(statuses),
    location: randomChoice(locations)
  }))
  
  res.json(data)
}

// 获取医护人员在岗状态
export const getStaffStatus = (req, res) => {
  const data = doctorNames.map((name, index) => ({
    id: index + 1,
    name,
    role: randomChoice(roles),
    status: Math.random() > 0.25 ? 'online' : 'offline'
  }))
  
  res.json(data)
}

// 获取危重症患者监控
export const getCriticalPatients = (req, res) => {
  const data = Array.from({ length: 6 }, (_, index) => ({
    id: index + 1,
    name: randomChoice(patientNames),
    age: generateRandomNumber(45, 75),
    heartRate: generateRandomNumber(90, 130),
    bloodPressure: `${generateRandomNumber(140, 180)}/${generateRandomNumber(85, 115)}`,
    temperature: (36 + Math.random() * 2.5).toFixed(1)
  }))
  
  res.json(data)
}

// 获取急诊综合数据（保留兼容性）
export const getEmergencyData = (req, res) => {
  const data = {
    totalToday: generateRandomNumber(200, 350),
    waiting: generateRandomNumber(20, 50),
    critical: generateRandomNumber(3, 10),
    bedOccupancy: generateRandomNumber(80, 98)
  }
  res.json(data)
}

