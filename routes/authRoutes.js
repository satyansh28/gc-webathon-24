const express = require("express");

const authController = require("./../controllers/authController");
//const {checkAdmin,checkLogin}=require("./../middleware/authMiddleware")
const router = express.Router();


router.post("/login", authController.login);
router.post("/register",authController.register);
// router.get("/logout",checkLogin,authController.logout)
// router.get("/resetPassword",checkLogin,authController.resetPassword);


module.exports = router;
