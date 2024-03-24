const mongoose = require("mongoose");
const schema = mongoose.Schema;

const studentCourse_schema = new schema(
  {
    courseId:{
        type:mongoose.Schema.ObjectId,
        ref:"Course",
        required:true
    },
    studentId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    grade:{
        type:String,
        enum:["A","B","C","D","P","F"]
    },
    attendedClasses:{
        type:Number,
        default:0
    }
  },
  { timestamps: true }
);
studentCourse_schema.index({ courseId: 1, studentId: 1}, { unique: true });

const studentCourse = mongoose.model("StudentCourse", studentCourse_schema);
module.exports = studentCourse;
