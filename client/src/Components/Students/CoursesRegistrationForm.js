import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import {
  TableContainer,
  Typography,
  Checkbox,
  Stack,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Button,
  Paper,
  Table,
} from "@mui/material";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const coursesData = [
  {
    courseName: "Applied Graph Theory",
    courseId: "CS4L005",
    eligibleBranches: ["CSE"],
    professors: ["Joy Mukherjee"],
    enrolledCount: 70,
    ltp: "3-0-0",
    credits: 4,
  },
  {
    courseName: "Advanced Algorithms",
    courseId: "CS6L007",
    eligibleBranches: ["CSE", "ECE", "EE"],
    professors: ["Manoranjan Sathpathy"],
    enrolledCount: 100,
    ltp: "3-1-0",
    credits: 4,
  },
  {
    courseName: "Compiler Design",
    courseId: "CS4L001",
    elgibleBranches: ["CSE"],
    professors: ["Srinivas Pinisetty"],
    enrolledCount: 100,
    ltp: "3-1-0",
    credits: 4,
  },
  {
    courseName: "Compiler Design Laboratory",
    courseId: "CS4P001",
    eligibleBranches: ["CSE", "ECE", "EE"],
    professors: ["Devashree Tripathi", "Ashwini Nanda"],
    enrolledCount: 70,
    ltp: "0-0-3",
    credits: 2,
  },
  {
    courseName: "Database Systems",
    courseId: "CS3L003",
    eligibleBranches: ["CSE"],
    professors: ["Padmalochan Bera"],
    enrolledCount: 70,
    ltp: "3-1-0",
    credits: 2,
  },
  {
    courseName: "Operating Systems",
    courseId: "CS3L005",
    elgibleBranches: ["CSE", "ECE", "EE", "MM", "ME", "CE"],
    professors: ["Srinivas Pinisetty"],
    enrolledCount: 120,
    ltp: "0-0-3",
    credits: 2,
  },
];

const CoursesRegistrationForm = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [courses, setCourses] = useState(null);
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const updateToRegistrationStatus = (index) => {
    const updatedRegistrationStatus = [...registrationStatus];
    updatedRegistrationStatus[index] = !registrationStatus[index];
    setRegistrationStatus(updatedRegistrationStatus);
  };

  const handleSubmit = (event) => {
    // api call to update the registered courses for the student
    let courseList=[]
    for(let i=0;i<courses.length;i++)
    {
      if(registrationStatus[i])
        courseList.push(courses[i]._id)
    }
    console.log(courseList)
    fetch(process.env.REACT_APP_BACKEND+"/api/student/applyCourses",{
      method:"POST",
      credentials:'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({courseList:courseList})
    }).then(res=>navigate("/courses"));
    
    event.preventDefault();
  };

  // {
  //   courseName: "Operating Systems",
  //   courseId: "CS3L005",
  //   elgibleBranches: ["CSE", "ECE", "EE", "MM", "ME", "CE"],
  //   professors: ["Srinivas Pinisetty"],
  //   enrolledCount: 120,
  //   ltp: "0-0-3",
  //   credits: 2,
  // }
  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND+"/api/student/getAvailableCourses",{
      credentials:'include'
    }).then(res=>{
      if(res.status===200)
        return res.json()
      else
        window.location.href="/"
    }).then((res)=>{
      console.log(res.courseList)
      setCourses(res.courseList)
      const initialRegistrationStatus = res.courseList.map((course) => {
        return false;
      });
      setRegistrationStatus(initialRegistrationStatus);
    })
    // api call to get the information of all courses for this student
    // setCourses(coursesData);
    // const initialRegistrationStatus = coursesData.map((course) => {
    //   return false;
    // });
    // setRegistrationStatus(initialRegistrationStatus);
  }, []);
  let content = null;
  if (courses === null) {
    content = <Typography>Loading...</Typography>;
  } else {
    const columnsDetails = [
      { columnName: "Course Name", columnType: "text", align: "left" },
      // { columnName: "Course ID", columnType: "text", align: "center" },
      // {
      //   columnName: "L-T-P",
      //   align: "center",
      // },
      {
        columnName: "Credit",
        align: "center",
      },
      {
        columnName: "Professors",
        align: "center",
      },
      {
        columnName: "Max Count",
        align: "center",
      },
      {
        columnName: "Enroll",
        align: "right",
      },
    ];
    content = (
      <Stack direction="column" spacing={2}>
        <Box>
          <TableContainer className="shadow" component={Paper} align="center">
            <Table>
              <TableHead display="inline-block">
                <TableRow>
                  {columnsDetails.map((columnDetails, index) => {
                    return (
                      <TableCell
                        align={columnDetails.align}
                        style={{ fontWeight: 600 }}
                        key={{ index }}
                      >
                        {columnDetails.columnName}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody display="inline-block">
                {courses.map((course, index) => {
                  return (
                    <TableRow>
                      <TableCell align="left">{course.name}</TableCell>
                      {/* <TableCell align="center">{course.courseId}</TableCell>
                      <TableCell align="center">{course.ltp}</TableCell> */}
                      <TableCell align="center">{course.credit}</TableCell>
                      <TableCell align="center">
                        <Stack direction="column">
                          {course.instructor.map((prof) => {
                            return <Typography>{prof.firstName+" "+prof.lastName}</Typography>;
                          })}
                        </Stack>
                      </TableCell>
                      <TableCell align="center">
                        {60}
                      </TableCell>
                      <TableCell align="right">
                        <Checkbox
                          {...label}
                          onChange={(event) => {
                            updateToRegistrationStatus(index);
                          }}
                          color="success"
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Stack>
    );
  }
  return (
    <Stack spacing={2}>
      <Typography variant="h4" className="oswald mb-4">
        Register for Courses
      </Typography>
      {content}
    </Stack>
  );
};

export default CoursesRegistrationForm;
