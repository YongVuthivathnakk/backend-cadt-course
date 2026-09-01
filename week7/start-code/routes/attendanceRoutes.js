import Router from "express"
import { getAttendanceByDate, markAttendance } from "../controllers/attendanceController.js";
const router = Router();


router.post("/", markAttendance)
router.get("/", getAttendanceByDate)

export default router;