const { isMongoId } = require("validator");

const { checkLogin, checkStaff } = require("../../middleware/authMiddleware");
const Course = require("../../models/courseModel");
const Asg = require("../../models/assignmentModel");

exports.getAllAssignments = [
  checkLogin,
  checkStaff,
  async (req, res) => {
    if (!("id" in req.params && isMongoId(req.params.id))) {
      res.status(400).send();
      return;
    }

    const courseId = req.params.id;
    if (req.user.role !== "admin") {
      const course = await Course.findOne({
        _id: courseId,
        instructor: {
          $elemMatch: { $eq: req.user._id },
        },
      }).exec();

      if (course === null) {
        res.status(404).send();
        return;
      }
    }

    const assignments = await Asg.find({ courseId: courseId }).exec();
    res.status(200).json(assignments);
  },
];

exports.getAssignment = [
  checkLogin,
  checkStaff,
  async (req, res) => {
    if (
      !(
        "id" in req.params &&
        isMongoId(req.params.id) &&
        "asgId" in req.params &&
        isMongoId(req.params.asgId)
      )
    ) {
      res.status(400).send();
      return;
    }

    const courseId = req.params.id;
    const asgId = req.params.asgId;
    if (req.user.role !== "admin") {
      const course = await Course.findOne({
        _id: courseId,
        instructor: {
          $elemMatch: { $eq: req.user._id },
        },
      }).exec();

      if (course === null) {
        res.status(404).send();
        return;
      }
    }

    const assignment = await Asg.findOne({
      _id: asgId,
      courseId: courseId,
    }).exec();
    if (assignment === null) {
      res.status(404).send();
      return;
    }
    res.status(200).json(assignment);
  },
];

exports.createAssignment = [
  checkLogin,
  checkStaff,
  async (req, res) => {
    if (!("id" in req.params && isMongoId(req.params.id))) {
      res.status(400).send();
      return;
    }

    const courseId = req.params.id;
    if (req.user.role !== "admin") {
      const course = await Course.findOne({
        _id: courseId,
        instructor: {
          $elemMatch: { $eq: req.user._id },
        },
      }).exec();

      if (course === null) {
        res.status(401).send();
        return;
      }
    }

    const assignment = new Asg({
      ...req.body,
      courseId: courseId,
    });
    try {
      await assignment.save();
    } catch (err) {
      res.status(400).json(err);
    }

    res.status(200).json(assignment);
  },
];
