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
      type:String,
    },
    firstName:{
      type:String
    },
    lastName:{
      type:String
    },
    profilePic:{
      type: Buffer
    },
    branch:{
      type:String,
      enum:["CSE","MECH","CIVIL","EE","EC","META"]
    },
    course:{
      type:String,
      enum:["B.Tech","M.tech"]
    },
    batch:{
      type:Number
    }
    
  },
  { timestamps: true }
);

const user = mongoose.model("User", user_schema);
module.exports = user;
