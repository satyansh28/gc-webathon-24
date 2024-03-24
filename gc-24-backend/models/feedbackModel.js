const mongoose = require("mongoose");
const schema = mongoose.Schema;

const feedback_schema = new schema(
  {
    actorId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    review:{
        type:String
    },
    reviewType:{
        type:String,
        enum:["course","staff","event"],
        required:true
    }
  },
  { timestamps: true }
);

const feedback = mongoose.model("Feedback", feedback_schema);
module.exports = feedback;
