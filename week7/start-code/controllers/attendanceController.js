import { AttendanceRecord } from "../models/index.js";

export async function getAttendanceByDate(req, res) {
  try {
    const { studentId, date } = req.query;
    const record = await AttendanceRecord.findOne({
      where: {
        studentId,
        date,
      },
    });
    if (!record) {
      return res.status(404).json({
        message: "Attendance record not found",
      });
    }
    res.json(record);
  } catch (err) {
    console.error("Error fetching attendance");
  }
}




export async function markAttendance(req, res ) {
  try {
    const { studentId, date, status, classId } = req.body;

    const record = await AttendanceRecord.create({
      studentId,
      classId,
      date,
      status,
    });

    res.status(201).json(record);
  } catch (error) {
    console.error("Error marking attendance:", error);

    res.status(500).json({
      message: "Failed to mark attendance",
    });
  }
}
