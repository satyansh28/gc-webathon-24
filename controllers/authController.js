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
    if (!email || !password) res.status(401).send();
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      res.status(401).send();
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
