import React, { useContext, useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Button,
  Stack,
  Box,
} from "@mui/material";
import UserContext from "../UserContext";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "green",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "red",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const studentsData = [];

const TakeAttendance = () => {
  const { courseId } = useParams();
  const [studentsDetails, setStudentsDetails] = useState(null);
  const [attendanceDetails, setAttendanceDetails] = useState(null);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    // api call to fetch student data enrolled in course with course id {courseID}
    fetch(
      `${process.env.REACT_APP_BACKEND}/api/academics/courses/${courseId}/students`,
      { credentials: "include" }
    )
      .then((res) => res.json())
      .then((courseStudents) => {
        const studentData = courseStudents.map((courseStudent) => ({
          id: `${courseStudent.studentId._id}`,
          name: `${courseStudent.studentId.firstName} ${courseStudent.studentId.lastName}`,
          roll_no: courseStudent.studentId.email.split("@")[0].toUpperCase(),
        }));
        console.log(studentData);
        setStudentsDetails(studentData);
      });

    setStudentsDetails(studentsData);
    const newAttendanceDetails = studentsData.map((el) => {
      return "A";
    });
    setAttendanceDetails(newAttendanceDetails);
    setLoading(false);
  }, [courseId]);

  const updateAttendanceUsingIndex = (updateIndex) => {
    let newAttendanceDetails = [...attendanceDetails];
    newAttendanceDetails[updateIndex] =
      attendanceDetails[updateIndex] == "P" ? "A" : "P";
    setAttendanceDetails(newAttendanceDetails);
  };

  const handleSubmit = async (event) => {
    // api call to send the attendance details to backend
    event.preventDefault();

    const attendance = studentsDetails
      .filter((_student, index) => attendanceDetails[index] === "P")
      .map((student) => student.id);

    await fetch(
      `${process.env.REACT_APP_BACKEND}/api/academics/courses/${courseId}/attendance`,
      {
        method: "POST",
        body: JSON.stringify({ students: attendance }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    setShouldRedirect(true);
  };

  let content = <></>;
  if (loading) {
    content = <Typography>Loading...</Typography>;
  } else if (!studentsDetails) {
    content = <Typography>Failed to fetch student data</Typography>;
  } else {
    const columnsDetails = [
      { columnName: "Name", columnType: "text", align: "left" },
      { columnName: "Roll Number", columnType: "text", align: "center" },
      {
        columnName: "Attendance",
        columnType: "chip",
        values: ["A", "P"],
        align: "right",
      },
    ];
    content = (
      <Stack spacing={1}>
        <Typography variant="h4" className=" mb-4" sx={{ fontWeight: 600 }}>
          Attendance
        </Typography>
        <TableContainer component={Paper} className="shadow">
          <Table>
            <TableHead>
              <TableRow>
                {columnsDetails.map((columnDetails, index) => {
                  return (
                    <TableCell
                      sx={{ fontWeight: 600, fontSize: "1.05em" }}
                      key={index}
                      align={columnDetails.align}
                    >
                      {columnDetails.columnName}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {studentsDetails.map((studentDetails, index) => {
                const chipColour =
                  attendanceDetails[index] === "P" ? "primary" : "secondary";
                return (
                  <TableRow key={index}>
                    <TableCell align="left">{studentDetails.name}</TableCell>
                    <TableCell align="center">
                      {studentDetails.roll_no}
                    </TableCell>
                    <TableCell align="right">
                      <ThemeProvider theme={theme}>
                        <Chip
                          label={
                            attendanceDetails[index] == "P"
                              ? "Present"
                              : "Absent"
                          }
                          onClick={(event) => updateAttendanceUsingIndex(index)}
                          color={chipColour}
                        />
                      </ThemeProvider>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
        {shouldRedirect && <Navigate replace to="/courses" />}
      </Stack>
    );
  }
  return content;
};
export default TakeAttendance;
