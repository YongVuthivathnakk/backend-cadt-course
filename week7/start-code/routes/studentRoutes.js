import { Router } from "express";
import { getStudentAttendance, getStudents } from "../controllers/studentController.js";

const router = Router();

router.get("/", getStudents);
router.get("/:id/attendance", getStudentAttendance)

export default router;
