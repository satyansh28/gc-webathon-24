const express = require("express");

const studentController = require("./../controllers/studentController");
const {checkLogin, checkStudent}=require("./../middleware/authMiddleware")
const router = express.Router();


router.put("/edit",checkLogin,studentController.editDetails);
router.get("/getAvailableCourses",checkLogin,checkStudent,studentController.getAvailableCourses);
router.post("/applyCourses",checkLogin,checkStudent,studentController.applyCourses)
router.get("/getMyCourses",checkLogin,checkStudent,studentController.getMyCourses)
router.get("/getMyAssignments",checkLogin,checkStudent,studentController.myAssignments)
router.post("/submitAssignment",checkLogin,checkStudent,studentController.submitAssignment)
router.get("/getFeedbackables",checkLogin,checkStudent,studentController.getFeedbackables)
router.post("/giveFeedback",checkLogin,checkStudent,studentController.giveFeedback)

// router.put("/resetPassword",checkLogin,studentController.resetPassword);


module.exports = router;
