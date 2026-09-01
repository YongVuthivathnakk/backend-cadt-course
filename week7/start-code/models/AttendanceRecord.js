import { DataTypes } from "sequelize";
import sequelize from "../utils/database.js";

const AttendanceRecord = sequelize.define("AttendanceRecord", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("present", "absent"),
    allowNull: false,
  },
});

export default AttendanceRecord;
