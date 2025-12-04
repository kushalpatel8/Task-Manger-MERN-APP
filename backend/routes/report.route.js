import express from 'express'
import { adminOnly, verifyToken } from '../utils/verifyUser.js'
import { exportTaskReport, exportUserReport } from '../controllers/report.controller.js'

const router = express.Router()

router.get("/export/tasks",verifyToken, adminOnly, exportTaskReport)

router.get("/export/users", verifyToken, adminOnly, exportUserReport)

export default router