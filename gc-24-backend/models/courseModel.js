const mongoose = require("mongoose");
const schema = mongoose.Schema;

const course_schema = new schema(
  {
    instructor: [mongoose.Schema.ObjectId], //id of instructors
    year: {
      type: Number,
      required:true
    },
    status:{
      type:String,
      enum: ["ongoing","open","over"]
    },
    semester:{
        type:String,
        enum:["Autumn","Spring"],
        required:true
    },
    name:{
        type:String,
        required:true
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
