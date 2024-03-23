const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const bcrypt = require("bcrypt");
require("dotenv").config();

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(401).send();
      return;
    }
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).send();
      return;
    }
    const token = signToken(user._id);
    const cookieOptions = {
      expires: new Date(
        Date.now() + 60 * 60 * 1000 // 1 hour
      ),
      httpOnly: true,
      secure: false,
    };
    res.cookie("jwt", token, cookieOptions);

    res.status(200).json({
      role: user.role,
      status: "success",
    });
    res.send();
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
};
exports.register = async (req, res, next) => {
  try {
    const { userData } = req.body;
    userData.password = await bcrypt.hash(userData.password, 12);
    const newUser = await User.create(userData);
    await newUser.save({ validateBeforeSave: false });
    res.status(201).send();
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
};

exports.logout = async (req, res, next) => {
  const cookieOptions = {
    expires: new Date(Date.now() - 1),
    httpOnly: true,
    secure: false,
  };
  res.cookie("jwt", "", cookieOptions);
  res.send();
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (req.user && (await bcrypt.compare(oldPassword, req.user.password))) {
      req.user.password = await bcrypt.hash(newPassword, 12);
      req.user.save();
      res.status(200).send();
    }
    res.status(401).send();
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
};
