import express from "express";
import { adminOnly, verifyToken } from "../utils/verifyUser.js";
import {
  createTask,
  deleteTask,
  getDashboardData,
  getTask,
  getTaskById,
  updateTask,
  updateTaskCheckList,
  updateTaskStatus,
  userDashboardData,
} from "../controllers/task.controller.js";

const router = express.Router();

router.post("/create", verifyToken, adminOnly, createTask);

router.get("/", verifyToken, getTask);

router.get("/dashboard-data", verifyToken, adminOnly, getDashboardData)

router.get("/user-dashboard-data", verifyToken, userDashboardData)

router.get("/:id", verifyToken, getTaskById);

router.put("/:id", verifyToken, updateTask)

router.delete("/:id", verifyToken, adminOnly, deleteTask)

router.put("/:id/status", verifyToken, updateTaskStatus)

router.put("/:id/todo", verifyToken, updateTaskCheckList)

export default router;
