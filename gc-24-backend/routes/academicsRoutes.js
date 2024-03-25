const express = require("express");
const {
  getCourses,
  getCourse,
  getCourseStudents,
  addAttendance,
  gradeCourseStudents,
} = require("../controllers/academics/courseController");
const {
  getAllAssignments,
  getAssignment,
  createAssignment,
} = require("../controllers/academics/assignmentController");
const router = express.Router();

router.get("/courses", getCourses);
router.get("/courses/:id", getCourse);
router.get("/courses/:id/students", getCourseStudents);
router.post("/courses/:id/attendance", addAttendance);
router.post("/courses/:id/grade", gradeCourseStudents);

router.get("/courses/:id/assignments", getAllAssignments);
router.post("/courses/:id/assignments", createAssignment);
router.get("/courses/:id/assignments/:asgId", getAssignment);

module.exports = router;
