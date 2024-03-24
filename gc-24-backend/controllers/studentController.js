const User = require("./../models/userModel");
const Course = require("./../models/courseModel");
const studentCourse = require("./../models/studentCourse");
const studentAssignment=require("../models/studentAssignment")
const feedback=require("../models/feedbackModel")
const assignment=require("../models/assignmentModel")
const equipments=[
  {name:"Badminton Raquet",stock:8},{name:"Shuttlecock",stock:6}
];
exports.editDetails = async (req, res, next) => {
  try {
    const { userData } = req.body;
    const keys = Object.keys(userData);
    keys.forEach((field) => {
      if (!["dob", "profilePic", "firstName", "lastName"].includes(field)) {
        res.status(400).send();
        return;
      } else {
        req.user[field] = userData[field];
      }
    });

    await req.user.save();
    res.status(201).send();
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
};

exports.getAvailableCourses = async (req, res, next) => {
  //await studentCourse.create({studentId:req.user._id,courseId:"65ff0f587701c2c78dc8fd5a"})
  console.log("done");
  try {
    let courses = await Course.find({ status: "open" }).exec();
    let alreadyApplied = await studentCourse
      .find({ studentId: req.user._id }, "courseId")
      .exec();
    alreadyApplied = alreadyApplied.map((course) => {
      return course.courseId.toString();
    });
    courses = courses.filter((course) => {
      if (alreadyApplied.includes(course._id.toString())) {
        return false;
      }
      return true;
    });
    res.status(200).json({
      courseList: courses,
    });
    res.send();
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
};

exports.applyCourses = async (req, res, next) => {
  try {
    const courseIdList = req.body.courseIdList;
    const toAddList = courseIdList.map((courseId) => {
      return {
        courseId: courseId,
        studentId: req.user._id,
      };
    });
    console.log(toAddList);
    await studentCourse.insertMany(toAddList);
    res.status(200).send();
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
};

exports.getMyCourses=async(req,res,next)=>{
    try{
        const resultList= await studentCourse.find({studentId:req.user._id}).populate({path:'courseId',populate:{path:'instructor'}}).exec()
        res.status(200).json({
            courseList:resultList
        })

    }
    catch(err)
    {
        console.log(err)
        res.status(400).send()
    }
}

exports.myAssignments=async(req,res,next)=>{
    
    try{
        const findFilter={studentId:req.user._id}
        if(req.query.assignmentId)
            findFilter.assignmentId=req.query.assignmentId     
        let resultList=await studentAssignment.find(findFilter).populate('assignmentId').exec()
        if(req.query.courseId)
        {
          resultList=resultList.filter(res=>res.assignmentId.courseId.toString()===req.query.courseId.toString())
        }
        res.status(200).json({
            assignmentList:resultList
        })
    }
    catch(err)
    {
        console.log(err)
        res.status(400).send()
    }
}

exports.submitAssignment=async(req,res,next)=>{
  try{
    await studentAssignment.create({studentId:req.user._id,assignmentId:req.body.assignmentId,answer:req.body.answer})
    res.status(201).send()
  }
  catch(err)
  {
    console.log(err)
    res.status(400).send()
  }
}

exports.getFeedbackables=async(req,res,next)=>{
  try{
    let courseList=await studentCourse.find({studentId:req.user._id}).populate('courseId').exec()
    courseList=courseList.map(course=>course.courseId)
    const profList= await User.find({role:"staff"}).select('firstName lastName _id').exec()
    const eventList=[{_id:"65ff0a117701c2c78dc8fd5a",name:"MUN",date:"22/03/2024"},{_id:"65ff05c387701c2c78dc8fd5a",name:"Spring Productions",date:"28/03/2024"}]
    res.status(200).json({
      courseList,eventList,profList
    }).send()
  }
  catch(err)
  {
    console.log(err)
    res.status(400).send()
  }
}

exports.giveFeedback=async(req,res,next)=>{
  try{
    await feedback.create({actorId:req.body.actorId,reviewType:req.body.type,review:req.body.review})
    res.status(200).send()
  }
  catch(err)
  {
    console.log(err)
    res.status(400).send()
  }
}

exports.getSACEquipment=async(req,res,next)=>{
  try{
    res.status(200).json({equipmentList:equipments}).send()
  }
  catch(err)
  {
    console.log(err)
    res.status(400).send()
  }
}

exports.updateSACEquipment=async(req,res,next)=>{
  try{
    for(i=0;i<equipments.length;i++)
    {
      if(equipments[i].name==req.body.equipmentName);
        equipments[i]+=parseInt(req.body.updateCount);
    }
    res.status(200).send()
  }
  catch(err)
  {
    console.log(err)
    res.status(400).send()
  }
}