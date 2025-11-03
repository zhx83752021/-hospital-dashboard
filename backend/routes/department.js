import express from 'express'
import { getDepartmentData } from '../controllers/departmentController.js'

const router = express.Router()

router.get('/data', getDepartmentData)

export default router

