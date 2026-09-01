import { Class, AttendanceRecord, Student } from "../models/index.js";

export async function getClassAttendance(req, res) {
  try {
    const {id} = req.params;

    const records = await AttendanceRecord.findAll({
        where: {classId: id}
        ,
        include: [
            {
          model: Student,
          attributes: ["id", "name", "email"],
            },
             {
          model: Class,
          attributes: ["id", "name"],
        },
        ],
 order: [["date", "DESC"]],

    })
    res.json(records);
  } catch(error) {
console.error("Error fetching class attendance:", error);

    res.status(500).json({
      message: "Failed to fetch class attendance",
    });
  }
}
