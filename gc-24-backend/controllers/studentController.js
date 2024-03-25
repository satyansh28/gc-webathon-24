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
    let courses = await Course.find({ status: "open" }).populate({path:'instructor'}).exec();
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
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
};

exports.applyCourses = async (req, res, next) => {
  try {
    if(!req.body.courseList)
    {
      res.status(403).send()
      next()
    }
    console.log(req.body.courseList)
    const courseIdList = req.body.courseList;
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
        let findFilter={}
          if(req.query.assignmentId)
            findFilter._id=req.query.assignmentId   
          else if(req.query.courseId){
            findFilter.courseId=req.query.courseId
          }
          else{
            res.status(400).send()
          }
            
          // courseList= await studentCourse.find({studentId:req.user._id}).select("_id").exec()
  
        //let resultList=await studentAssignment.find(findFilter).populate('assignmentId').exec()
        // courseList=courseList.map(course=>{return course._id})
        let resultList= await assignment.find(findFilter) 

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
    })
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
    res.status(200).json({equipmentList:equipments})
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