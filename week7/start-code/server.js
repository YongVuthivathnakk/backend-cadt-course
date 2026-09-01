import dotenv from "dotenv";
import express from "express"
import sequelize from "./utils/database.js";

import studentRoutes from "./routes/studentRoutes.js"
import attendanceRoutes from "./routes/attendanceRoutes.js"
import classRoutes from "./routes/classRoutes.js"
dotenv.config();

const PORT = process.env.PORT;

const app = express()
app.use(express.json());

app.use("/students", studentRoutes)
app.use("/attendance", attendanceRoutes)
app.use("/class", classRoutes)

try {
    await sequelize.authenticate()
      console.log("Database connected successfully.");

      await sequelize.sync()

      app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);

      });
} catch (error) {
  console.error("Unable to connect to database:", error);
}