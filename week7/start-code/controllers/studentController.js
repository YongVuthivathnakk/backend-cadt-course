import { AttendanceRecord, Student, Class } from "../models/index.js";

export async function getStudents(req, res) {
    try{
        const students = await Student.findAll();
        res.json(students)
    } catch (err) {
        console.error("Error fetching students", err);
        res.status(500).json({
            message: "Failed to fetch students"
        })
    }
}

export async function getStudentAttendance(req, res) {
  try {
    const { id } = req.params;

    const records = await AttendanceRecord.findAll({
      where: {
        studentId: id,
      },
      include: [
        {
          model: Class,
          attributes: ["id", "name"],
        },
      ],
      order: [["date", "DESC"]],
    });

    res.json(records);
  } catch (error) {
    console.error("Error fetching student attendance:", error);

    res.status(500).json({
      message: "Failed to fetch student attendance",
    });
  }
}