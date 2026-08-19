// server.js
import express from "express";
import courses from "./course.js";
const app = express();
const PORT = 3000;

// Route: GET /departments/:dept/courses
app.get("/departments/:dept/courses", (req, res) => {
  const { dept } = req.params;
  const { level, minCredits, maxCredits, semester, instructor } = req.query;
  // Implementing the filter logic
  // Hint: Use the filter method to filter the courses array based on the provided criteria'
const min = minCredits ? Number(minCredits) : null;
  const max = maxCredits ? Number(maxCredits) : null;

  // Invalid credit range
  if (min !== null && max !== null && min > max) {
    return res.status(400).json({
      message: "Invalid credit range",
    });
  }

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
      total: filteredCourses.length
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
