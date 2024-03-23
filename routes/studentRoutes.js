const express = require("express");

const studentController = require("./../controllers/studentController");
const {checkAdmin,checkLogin}=require("./../middleware/authMiddleware")
const router = express.Router();


// router.post("/login", studentController.login);
// router.post("/register",checkLogin,checkAdmin,studentController.register);
// router.get("/logout",studentController.logout)
// router.put("/resetPassword",checkLogin,studentController.resetPassword);


module.exports = router;
