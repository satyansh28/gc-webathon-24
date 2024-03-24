const express = require("express");

const adminController = require("./../controllers/adminController");
const {checkAdmin,checkLogin}=require("./../middleware/authMiddleware")
const router = express.Router();


router.post("/addCourse", checkLogin,checkAdmin,adminController.addCourse);
router.get("/getProfessors",checkLogin,checkAdmin,adminController.getProfessors);
router.get("/getFeedbacks",checkLogin,checkAdmin,adminController.getFeedbacks)
router.get("/getCourses",checkLogin,checkAdmin,adminController.getCourses)


module.exports = router;
