import { generateRandomNumber } from '../utils/dataGenerator.js'

export const getDepartmentData = (req, res) => {
  const departments = [
    '心内科',
    '骨科',
    '神经外科',
    '消化内科',
    '呼吸内科',
    '泌尿外科',
    '妇产科',
    '儿科'
  ]

  const data = departments.map(name => ({
    name,
    workload: generateRandomNumber(50, 150)
  }))

  res.json(data)
}

