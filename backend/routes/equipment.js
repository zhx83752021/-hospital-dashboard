import express from 'express'
import { getEquipmentData } from '../controllers/equipmentController.js'

const router = express.Router()

router.get('/data', getEquipmentData)

export default router

