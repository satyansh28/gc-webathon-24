const mongoose = require("mongoose");
const schema = mongoose.Schema;
const validator = require("validator");

const user_schema = new schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail],
    },
    role: {
      type: String,
      enum: ["student", "staff","admin"],
      default: "student",
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
    },
    dob:{
      type:Date,
    },
    firstName:{
      type:String
    },
    lastName:{
      type:String
    },
    profilePic:{
      type: Buffer
    }
    
  },
  { timestamps: true }
);

const user = mongoose.model("User", user_schema);
module.exports = user;
