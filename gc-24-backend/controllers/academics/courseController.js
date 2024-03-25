const mongoose = require("mongoose");
const { isMongoId } = require("validator");

const { checkLogin, checkStaff } = require("../../middleware/authMiddleware");
const Course = require("../../models/courseModel");
const StudentCourse = require("../../models/studentCourse");

exports.getCourses = [
  checkLogin,
  checkStaff,
  async (_req, res) => {
    try {
      const courses = await Course.find({}).exec();
      res.status(200).json(courses);
    } catch (err) {
      console.error("Could not access Courses");
      console.error(err);
      res.status(500).send();
    }
  },
];

exports.getCourse = [
  checkLogin,
  checkStaff,
  async (req, res) => {
    if (!("id" in req.params && isMongoId(req.params.id))) {
      res.status(400).send();
      return;
    }
    const courseId = req.params.id;

    try {
      const course = await Course.findById(courseId).exec();
      if (course === null) {
        res.status(404).send();
        return;
      }
      res.status(200).json(course);
    } catch (err) {
      console.error("Could not access Courses");
      console.error(err);
      res.status(500).send();
    }
  },
];

exports.getCourseStudents = [
  checkLogin,
  checkStaff,
  async (req, res) => {
    if (!("id" in req.params && isMongoId(req.params.id))) {
      res.status(400).send();
      return;
    }
    const courseId = req.params.id;

    try {
      const students = await StudentCourse.find({ courseId: courseId }).exec();
      res.status(200).json(students);
    } catch (err) {
      console.error("Could not access Courses");
      console.error(err);
      res.status(500).send();
    }
  },
];

exports.addAttendance = [
  checkLogin,
  checkStaff,
  async (req, res) => {
    if (
      !(
        "id" in req.params &&
        isMongoId(req.params.id) &&
        "students" in req.body &&
        Array.isArray(req.body.students) &&
        req.body.students.every(
          (studentId) => typeof studentId === "string" && isMongoId(studentId)
        )
      )
    ) {
      res.status(400).send();
      return;
    }

    const courseId = req.params.id;

    try {
      const course = await Course.findById(courseId).exec();
      if (
        req.user.role !== "admin" &&
        !course.instructor.includes(req.user._id)
      ) {
        res.status(400).send();
        return;
      }
      course.numberOfClasses++;
      await course.save();

      const students = await StudentCourse.updateMany(
        { courseId: courseId, studentId: { $in: req.body.students } },
        { $inc: { attendedClasses: 1 } }
      ).exec();

      res.status(200).json({ course, students });
    } catch (err) {
      console.error("Could not access Courses");
      console.error(err);
      res.status(500).send();
    }
  },
];