import { generateRandomNumber } from '../utils/dataGenerator.js'

export const getPatientTrend = (req, res) => {
  const times = Array.from({ length: 24 }, (_, i) => `${i}:00`)
  
  const data = times.map(time => ({
    time,
    outpatient: generateRandomNumber(30, 120),
    emergency: generateRandomNumber(10, 50),
    inpatient: generateRandomNumber(400, 600)
  }))

  res.json(data)
}

