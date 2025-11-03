import express from 'express'
import { getPatientTrend } from '../controllers/patientController.js'

const router = express.Router()

router.get('/trend', getPatientTrend)

export default router

