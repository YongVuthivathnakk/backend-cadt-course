// server.js
import express from "express";
import courses from "./course.js";
const app = express();
const PORT = 3000;

function logger(req, res, next) {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
}

function authenthication(req, res, next) {
  const { token } = req.query;

  const validToken = "nakk123";
  if (!token || token !== validToken) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  next();
}

function validateCredits(req, res, next) {
  const { minCredits, maxCredits } = req.query;

  if (
    minCredits !== undefined &&
    (!Number.isInteger(Number(minCredits)) || minCredits.trim() === "")
  ) {
    return res.status(400).json({
      message: "minCredits must be a valid integer",
    });
  }

  if (
    maxCredits !== undefined &&
    (!Number.isInteger(Number(maxCredits)) || maxCredits.trim() === "")
  ) {
    return res.status(400).json({
      message: "maxCredits must be a valid integer",
    });
  }
  const min = minCredits !== undefined ? Number(minCredits) : null;
  const max = maxCredits !== undefined ? Number(maxCredits) : null;

  // Invalid credit range
  if (min !== null && max !== null && min > max) {
    return res.status(400).json({
      message: "Invalid credit range",
    });
  }

  next();
}

app.use(logger);

// Route: GET /departments/:dept/courses
app.get("/departments/:dept/courses",authenthication, validateCredits,  (req, res) => {
  const { dept } = req.params;
  const { level, minCredits, maxCredits, semester, instructor } = req.query;
  // Implementing the filter logic
  // Hint: Use the filter method to filter the courses array based on the provided criteria'

  const filteredCourses = courses.filter((course) => {
    if (course.department !== dept) {
      return false;
    }

    if (level && course.level !== level) {
      return false;
    }

    if (minCredits && course.credits < Number(minCredits)) {
      return false;
    }
    if (maxCredits && course.credits > Number(maxCredits)) {
      return false;
    }

    if (semester && course.semester !== semester) {
      return false;
    }
    if (
      instructor &&
      !course.instructor.toLowerCase().includes(instructor.toLowerCase())
    ) {
      return false;
    }

    return true;
  });
  if (filteredCourses.length === 0) {
    return res.status(404).json({
      message: "Courses Not Found",
    });
  }
  return res.status(200).json({
    results: filteredCourses,
    meta: {
      total: filteredCourses.length,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
