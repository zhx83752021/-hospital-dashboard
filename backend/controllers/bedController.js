import { generateRandomNumber } from '../utils/dataGenerator.js'

export const getBedData = (req, res) => {
  const total = 800
  const occupied = generateRandomNumber(600, 750)
  const available = total - occupied
  const rate = Math.round((occupied / total) * 100)

  const data = {
    total,
    occupied,
    available,
    rate
  }

  res.json(data)
}

