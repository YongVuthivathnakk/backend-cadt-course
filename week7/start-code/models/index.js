
import Class from "./Class.js"
import AttendanceRecord from "./AttendanceRecord.js";
import Student from "./Student.js";


Student.hasMany(AttendanceRecord, {foreignKey: "studentId"});

AttendanceRecord.belongsTo(Student, {
  foreignKey: "studentId",
});


Class.hasMany(AttendanceRecord, {
  foreignKey: "classId",
});

AttendanceRecord.belongsTo(Class, {
  foreignKey: "classId",
});

export {
  Student,
  Class,
  AttendanceRecord,
};