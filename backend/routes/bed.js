import express from 'express'
import { getBedData } from '../controllers/bedController.js'

const router = express.Router()

router.get('/data', getBedData)

export default router

