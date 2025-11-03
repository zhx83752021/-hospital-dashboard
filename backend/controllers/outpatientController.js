import { generateRandomNumber, randomChoice } from '../utils/dataGenerator.js'

// 医生姓名列表
const doctorNames = ['王建国', '李明', '张华', '刘芳', '陈静', '赵医生', '周主任', '孙医生']
const departments = ['心内科', '骨科', '消化科', '呼吸科', '神经内科', '内分泌科']

// 获取叫号信息
export const getCallingInfo = (req, res) => {
  const data = {
    number: `A${generateRandomNumber(100, 199)}`,
    room: `${generateRandomNumber(1, 15)}号诊室`
  }
  res.json(data)
}

// 获取科室等候情况
export const getDepartmentQueue = (req, res) => {
  const data = departments.map(dept => ({
    name: dept,
    doctor: randomChoice(doctorNames),
    waiting: generateRandomNumber(3, 25),
    avgTime: generateRandomNumber(8, 20)
  }))
  res.json(data)
}

// 获取医生出诊信息
export const getDoctorSchedule = (req, res) => {
  const titles = ['主任医师', '副主任医师', '主治医师']
  const data = doctorNames.slice(0, 5).map((name, index) => ({
    id: index + 1,
    name,
    department: randomChoice(departments),
    title: randomChoice(titles),
    status: Math.random() > 0.3 ? 'working' : 'rest'
  }))
  res.json(data)
}

// 获取门诊综合数据
export const getOutpatientData = (req, res) => {
  const data = {
    totalToday: generateRandomNumber(400, 800),
    currentWaiting: generateRandomNumber(80, 150),
    departments: [
      { name: '内科', waiting: generateRandomNumber(10, 30) },
      { name: '外科', waiting: generateRandomNumber(8, 25) },
      { name: '儿科', waiting: generateRandomNumber(15, 40) },
      { name: '妇产科', waiting: generateRandomNumber(5, 20) }
    ]
  }
  res.json(data)
}

