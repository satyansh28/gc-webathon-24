const express = require("express");
const {
  getCourses,
  getCourse,
  getCourseStudents,
  addAttendance,
  gradeCourseStudents,
} = require("../controllers/academics/courseController");
const router = express.Router();

router.get("/courses", getCourses);
router.get("/courses/:id", getCourse);
router.get("/courses/:id/students", getCourseStudents);
router.post("/courses/:id/attendance", addAttendance);
router.post("/courses/:id/grade", gradeCourseStudents);

module.exports = router;
