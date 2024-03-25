const express = require("express");

const authController = require("./../controllers/authController");
const {checkAdmin,checkLogin}=require("./../middleware/authMiddleware")
const router = express.Router();


router.post("/login", authController.login);
router.post("/register",checkLogin,checkAdmin,authController.register);
router.get("/myProfile",checkLogin,authController.myProfile)
router.get("/logout",authController.logout)
router.put("/resetPassword",checkLogin,authController.resetPassword);


module.exports = router;
