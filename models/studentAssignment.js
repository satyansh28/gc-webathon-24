const mongoose = require("mongoose");
const schema = mongoose.Schema;

const studentAsg_schema = new schema(
  {
    assignmentId:{
        type:mongoose.Schema.ObjectId,
        ref:"Asg",
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
    feedback:{
        type:String
    },
    answer:{
        type:String
    }
  },
  { timestamps: true }
);

const studentAsg = mongoose.model("StudentAsg", studentAsg_schema);
module.exports = studentAsg;
