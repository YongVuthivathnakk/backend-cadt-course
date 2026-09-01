import { DataTypes } from "sequelize";
import sequelize from "../utils/database.js";

const Class = sequelize.define("Class", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
});

export default Class;
