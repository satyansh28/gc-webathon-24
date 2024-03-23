const mongoose = require("mongoose");
const schema = mongoose.Schema;

const asg_schema = new schema(
  {
    courseId:{
        type:mongoose.Schema.ObjectId,
        ref:"Course",
        required:true
    },
    question:{
        type:String
    },
    dueDate:{
        type:Date
    }
  },
  { timestamps: true }
);

const asg = mongoose.model("Asg", asg_schema);
module.exports = asg;
