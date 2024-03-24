require("dotenv").config();
const User=require("../models/userModel")
const jwt = require("jsonwebtoken");

exports.checkLogin = async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      //verifies the token
      const decoded = await jwt.verify(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      console.log(decoded);
      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        res.status(401).send();
      }

      // there is a user logged in
      req.user = currentUser;
      return next();
    }
    else
      res.status(401).send();
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
};

exports.checkStudent = async (req, res, next) => {
    
    if(req.user.role && ["student","admin"].includes(req.user.role))
        return next();
    else
        res.status(401).send();
};

exports.checkStaff = async (req, res, next) => {
    
    if(req.user.role && ["staff","admin"].includes(req.user.role))
        return next();
    else
        res.status(401).send();
};

exports.checkAdmin = async (req, res, next) => {
    console.log(req.user);
    if(req.user.role && ['admin'].includes(req.user.role))
        return next();
    else
        {console.log(req.user.role + "+"+(req.user.role in ["admin"]))
        res.status(401).send();}
};
