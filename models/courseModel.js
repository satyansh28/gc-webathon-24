const mongoose = require("mongoose");
const schema = mongoose.Schema;

const course_schema = new schema(
  {
    instructor: [String], //id of instructors
    year: {
      type: Number,
      required:true
    },
    semester:{
        type:String,
        enum:["Autumn","Spring"],
        required:true
    },
    name:{
        type:String
    },
    numberOfClasses:{
        type:Number,
        default:0
    }
  },
  { timestamps: true }
);

const course = mongoose.model("Course", course_schema);
module.exports = course;
