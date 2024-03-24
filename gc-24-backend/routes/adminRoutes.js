const express = require("express");

const adminController = require("./../controllers/adminController");
const {checkAdmin,checkLogin}=require("./../middleware/authMiddleware")
const router = express.Router();


router.post("/addCourse", checkLogin,checkAdmin,adminController.addCourse);
router.get("/getProfessors",checkLogin,checkAdmin,adminController.getProfessors);
router.get("/getFeedbacks",checkLogin,checkAdmin,adminController.getFeedbacks)


module.exports = router;
