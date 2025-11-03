import express from 'express'
import { getQueueData } from '../controllers/queueController.js'

const router = express.Router()

router.get('/data', getQueueData)

export default router

