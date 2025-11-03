import express from 'express'
import { getOperationData } from '../controllers/operationController.js'

const router = express.Router()

router.get('/data', getOperationData)

export default router

