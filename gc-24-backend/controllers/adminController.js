const User = require("./../models/userModel");
const Course = require("../models/courseModel");
const feedback = require("../models/feedbackModel");

exports.addCourse = async (req, res, next) => {
  try {
    const courseDetails = req.body.courseDetails;
    const newCourse = await Course.create(courseDetails);
    await newCourse.save();
    res.status(201).send();
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
};
exports.getProfessors = async (req, res, next) => {
  try {
    const profList = await User.find({ role: "staff" })
      .select("email firstName lastName")
      .exec();
    res
      .status(200)
      .json({
        professorList: profList,
      })
      .send();
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
};
exports.getCourses = async (req, res, next) => {
  try {
    const courseList = await Course.find().populate('instructor','firstName lastName email')
      .exec();
    res
      .status(200)
      .json({
        courseList: courseList,
      })
      .send();
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
};
exports.getFeedbacks = async (req, res, next) => {
  try {
    const proffesorList = await feedback
      .find({ reviewType: "staff" })
      .populate({ path: "actorId", model: User })
      .exec();
    const courseList = await feedback
      .find({ reviewType: "course" })
      .populate({ path: "actorId", model: course })
      .exec();
    const eventList = await feedback.find({ reviewType: "event" }).exec();
    res.status(200).json({
        proffesorList,courseList,eventList
    }).send()

}
  catch(error)
  {
    console.log(error)
    res.status(400).send()
  }
};
