import React, { useContext, useEffect, useState } from "react";
import Card from "../UI/Card/Card";
import UserContext from "../UserContext";
import { Box, Typography, Grid, Button, Stack } from "@mui/material";
import { Navigate } from "react-router-dom";
// import "../../Styles/Courses.css";
const coursesData = [
  {
    courseName: "Data Structures",
    courseId: "CS2L004",
    eligibleBranches: ["CSE"],
    professors: ["Joy Mukherjee"],
    enrolledCount: 70,
  },
  {
    courseName: "Game Theory",
    courseId: "CS6L031",
    eligibleBranches: ["CSE", "ECE", "EE"],
    professors: ["Manoranjan Sathpathy"],
    enrolledCount: 60,
  },
  {
    courseName: "Software Engineering",
    courseId: "CS6L034",
    elgibleBranches: ["CSE", "ECE", "EE"],
    professors: ["Srinivas Pinisetty"],
    enrolledCount: 100,
  },
  {
    courseName: "Mathematical Foundations of Computer Science",
    courseId: "CS6L015",
    eligibleBranches: ["CSE", "ECE", "EE"],
    professors: ["Manoranjan Sathpathy", "Debi Prasad Dogra"],
    enrolledCount: 90,
  },
  {
    courseName: "Software Testing and Verification",
    courseId: "CS6L023",
    eligibleBranches: ["CSE", "ECE", "EE"],
    professors: ["Srinivas Pinisetty"],
    enrolledCount: 110,
  },
  {
    courseName: "Introduction to Programming and Data Structures",
    courseId: "CS1L001",
    elgibleBranches: ["CSE", "ECE", "EE", "MM", "ME", "CE"],
    professors: ["Srinivas Pinisetty"],
    enrolledCount: 120,
  },
];

const Courses = () => {
  // return <div>Courses</div>;
  const { user } = useContext(UserContext);
  const [courses, setCourses] = useState(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    if (user.role === "student") {
      fetch(process.env.REACT_APP_BACKEND + "/api/student/getMyCourses", {
        credentials: "include",
      })
        .then((res) => {
          if (res.status === 200) return res.json();
          else window.location.href = "/";
        })
        .then((res) => {
          console.log(res.courseList);
          setCourses(res.courseList);
        });
    } else if (user.role === "admin") {
      fetch(process.env.REACT_APP_BACKEND + "/api/admin/getCourses", {
        credentials: "include",
      })
        .then((res) => {
          if (res.status === 200) return res.json();
          else window.location.href = "/";
        })
        .then((res) => {
          console.log(res.courseList);
          setCourses(res.courseList);
        });
    } else{
      fetch(process.env.REACT_APP_BACKEND + "/api/academics/courses", {
        credentials: "include",
      })
        .then((res) => {
          if (res.status === 200) return res.json();
          else window.location.href = "/";
        })
        .then((res) => {
          console.log(res);
          setCourses(res);
        });
    }
    //setCourses(coursesData);
  }, [user]);

  const CourseName = (props) => {
    const { courseName } = props;
    return (
      <Typography
        variant="h6"
        className="oswald"
        sx={{
          fontSize: "1.2rem",
          fontHeight: "0.4rem",
          fontWeight: 600,
        }}
      >
        {courseName}
      </Typography>
    );
  };

  const CourseId = (props) => {
    const { courseId } = props;
    return (
      <Typography
        variant="body2"
        sx={{ fontWeight: 600, color: "rgb(100,100,100)" }}
        className="tauri-regular"
      >
        {courseId}
      </Typography>
    );
  };

  const handleAssignGrade = (courseId) => {
    setShouldRedirect(true);
    // setRedirectPath(`/courses/assignment/view/${courseId}`);
    setRedirectPath(`/courses/assign-grade/${courseId}`);
  };

  const handleViewAssignments = (courseId) => {
    setShouldRedirect(true);
    setRedirectPath(`/courses/assignments/${courseId}`);
  };

  const handleTakeAttendance = (courseId) => {
    setShouldRedirect(true);
    setRedirectPath(`/take-attendance/${courseId}`);
  };

  console.log(courses);
  console.log(user);
  let coursesContent = <Typography>My courses</Typography>;
  if (courses == null) {
    coursesContent = <Typography>Loading...</Typography>;
  } else if (user.role === "student") {
    coursesContent = courses.map((course, index) => {
      return (
        <Grid item xs={4}>
          <Card sx={{ minHeight: 700 }} key={index}>
            <Stack spacing={2}>
              <Box>
                <CourseName courseName={course.courseId.name} />
              </Box>
              <Stack direction="row" spacing={2}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, color: "rgb(100,100,100)" }}
                  className="tauri-regular"
                >
                  Instructors:
                </Typography>

                <Box direction="column" spacing={1}>
                  {course.courseId.instructor.map((prof, index) => {
                    return (
                      <Typography
                        variant="subtitle1"
                        key={index}
                        sx={{ fontWeight: 600, fontSize: "1.05rem" }}
                        className="tauri-regular"
                      >
                        {prof.firstName}
                      </Typography>
                    );
                  })}
                </Box>
              </Stack>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, color: "rgb(100,100,100)" }}
                className="tauri-regular"
              >
                Attendance: {course.attendedClasses}/
                {course.courseId.numberOfClasses}
              </Typography>
              { 
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, color: "rgb(100,100,100)" }}
                className="tauri-regular"
              >
                Grade: {course.grade || "-"}
              </Typography>
              }
              <Button
                variant="contained"
                onClick={(event) => {
                  handleViewAssignments(course.courseId._id);
                  event.preventDefault();
                }}
              >
                View Assignments
              </Button>
            </Stack>
          </Card>
        </Grid>
      );
    });
  } else if (user.role === "staff" || user.role === "admin") {
    coursesContent = courses.map((course, index) => {
      return (
        <Grid item xs={4} sx={{ height: "100%" }} key={index}>
          <Card>
            <Stack direction="column" spacing={2}>
              <Box>
                <CourseName courseName={course.name} />
                <Box
                  direction="row"
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, color: "rgb(100,100,100)" }}
                    className="tauri-regular"
                  >
                    Strength: 60
                  </Typography>
                </Box>
              </Box>
              <Stack direction="column" spacing={1}>
                <Button
                  variant="contained"
                  onClick={(event) => {
                    handleViewAssignments(course._id);
                    event.preventDefault();
                  }}
                >
                  View Assignments
                </Button>
                <Button
                  variant="contained"
                  onClick={(event) => {
                    handleTakeAttendance(course._id);
                    event.preventDefault();
                  }}
                >
                  Take Attendance
                </Button>
                <Button
                  variant="contained"
                  onClick={(event) => {
                    handleAssignGrade(course._id);
                    event.preventDefault();
                  }}
                >
                  Assign Grade
                </Button>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      );
    });
  }
  return (
    <>
      <Typography variant="h4" className="oswald mb-4">
        My Courses
      </Typography>
      <Grid container spacing={2} id="courses-column-container">
        {coursesContent}
      </Grid>
      {shouldRedirect && <Navigate replace to={redirectPath} />}
    </>
  );
};

export default Courses;
