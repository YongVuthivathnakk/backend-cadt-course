import { Router } from "express";
import { getClassAttendance } from "../controllers/classController.js";

const router = Router();

router.get("/:id/attendance", getClassAttendance);

export default router;
