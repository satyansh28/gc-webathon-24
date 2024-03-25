const mongoose = require("mongoose");
const { isMongoId } = require("validator");

const { checkLogin, checkStaff } = require("../../middleware/authMiddleware");
const Course = require("../../models/courseModel");
const StudentCourse = require("../../models/studentCourse");

exports.getCourses = [
  checkLogin,
  checkStaff,
  async (req, res) => {
    let filter = {};
    if (req.user.role !== "admin") {
      filter = Object.assign(filter, {
        instructor: {
          $elemMatch: { $eq: req.user._id },
        },
      });
    }

    try {
      const courses = await Course.find(filter).exec();
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

exports.gradeCourseStudents = [
  checkLogin,
  checkStaff,
  async (req, res) => {
    if (
      !(
        "id" in req.params &&
        isMongoId(req.params.id) &&
        "grades" in req.body &&
        typeof req.body.grades === "object" &&
        Object.entries(req.body.grades).every(
          ([key, value]) =>
            typeof key === "string" &&
            isMongoId(key) &&
            typeof value === "string" &&
            ["A", "B", "C", "D", "P", "F"].includes(value)
        )
      )
    ) {
      res.status(400).send();
      return;
    }

    const courseId = req.params.id;

    const updates = await Promise.all(
      Object.entries(req.body.grades).map(([key, value]) => {
        console.log({ courseId: courseId, studentId: key });
        return StudentCourse.findOneAndUpdate(
          { courseId: courseId, studentId: key },
          { $set: { grade: value } }
        ).exec();
      })
    );

    res.status(200).json(updates);
  },
];
