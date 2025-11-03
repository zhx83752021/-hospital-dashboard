import { generateRandomNumber } from '../utils/dataGenerator.js'

export const getOperationData = (req, res) => {
  const data = {
    outpatientCount: generateRandomNumber(200, 400),
    emergencyCount: generateRandomNumber(50, 150),
    inpatientCount: generateRandomNumber(300, 600),
    surgeryCount: generateRandomNumber(10, 40),
    revenue: generateRandomNumber(500000, 1200000)
  }

  res.json(data)
}

