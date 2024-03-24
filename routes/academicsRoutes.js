const express = require("express");
const {
  getCourses,
  getCourse,
  getCourseStudents,
  addAttendance,
} = require("../controllers/academics/courseController");
const router = express.Router();

router.get("/courses", getCourses);
router.get("/courses/:id", getCourse);
router.get("/courses/:id/students", getCourseStudents);
router.post("/courses/:id/attendance", addAttendance);

module.exports = router;
