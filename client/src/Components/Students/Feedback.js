import {
  Typography,
  Box,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Card,
  CardActions,
  CardContent,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { Margin, Send } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
let text = "";
const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
    box-sizing: border-box;
    width: 800px;
    height: 1000px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const SelectOption = (props) => {
  const { selectedOption, displayText, setSelectedOption, options } = props;
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  console.log(options);

  return (
    <FormControl
      sx={{ m: 1, minWidth: 150 }}
      style={{ backgroundColor: "white" }}
    >
      <InputLabel
        style={{ fontSize: "0.9em" }}
        id="demo-simple-select-autowidth-label"
      >
        {displayText}
      </InputLabel>
      <Select
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        value={selectedOption}
        onChange={handleChange}
        autoWidth
        style={{ height: "3em" }}
        label={displayText}
      >
        {options.map((option, index) => {
          return (
            <MenuItem key={index} value={option} style={{ fontSize: "0.9em" }}>
              {option}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const professorsData = [
  { name: "Manoranjan Sathpathy", email: "manoranjan@iitbbs.ac.in" },
  { name: "Srinivas Pinsetty", email: "spinsetty@iitbbs.ac.in" },
  { name: "Joy Mukherjee", email: "joy@iitbbs.ac.in" },
  { name: "Debi Prasad Dogra", email: "dpdogra@iitbbs.ac.in" },
  { name: "Padmalochan Bera", email: "plb@iitbbs.ac.in" },
  { name: "Devashree Tripathy", email: "devshreetripathy@iitbbs.ac.in" },
];

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

const feedbackTypes = ["Course", "Professor", "Campus Events", "Facilities"];

const Feedback = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFeedbackType, setSelectedFeedbackType] = useState(null);
  const [professors, setProfessors] = useState(null);
  const [courses, setCourses] = useState(null);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedOtherEntity, setSelectedOtherEntity] = useState(null);

  useEffect(() => {
    // api call to get courses and professors
    fetch(process.env.REACT_APP_BACKEND + "/api/student/getFeedbackables", {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        else window.location.href = "/";
      })
      .then((res) => {
        console.log(res);
        setProfessors(res.profList || []);
        setCourses(res.courseList || []);
        setIsLoading(false);
      });
  }, []);
  const professorsNames =
    professors === null
      ? []
      : professors.map((professor) => {
          return professor.firstName + " " + professor.lastName;
        });
  const coursesNames =
    courses === null
      ? []
      : courses.map((course) => {
          return course.name;
        });
  const updateText = (e) => {
    text = e.target.value;
  };
  const handleSubmit = (event) => {
    console.log(text);
    if (text === "") return;
    let type = "None";
    let actorId = null;
    if (selectedFeedbackType === "Professor") {
      type = "staff";
      professors.forEach((professor) => {
        if (
          professor.firstName + " " + professor.lastName ===
          selectedProfessor
        )
          actorId = professor._id;
      });
      // api call to the add the feedback in those of the respective professor
    } else if (selectedFeedbackType === "Course") {
      type = "course";
      courses.forEach((course) => {
        if (course.name === selectedCourse) actorId = course._id;
      });
      // api call to the add the feedback in those of the respective professor
    } else if (
      selectedFeedbackType === "Campus Events" ||
      selectedFeedbackType === "Facilities"
    ) {
      type = "event";
      // api call to the add the feedback in those of the respective professor
    }
    fetch(process.env.REACT_APP_BACKEND + "/api/student/giveFeedback", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ actorId, type, review: text }),
    }).then((res) => navigate("/courses"));
    event.preventDefault();
    //navigate("/courses");
  };
  if (isLoading) {
    
    return <Typography>Loading...</Typography>;
  }
  return (
    <Stack>
      <Typography variant="h4" className="oswald mb-4">
        Feedback
      </Typography>
      <Box sx={{ minWidth: 275 }}>
        <Card
          variant="outlined"
          style={{ backgroundColor: "rgb(235,245,255)" }}
        >
          <CardContent>
            <Box className="d-flex justify-content-start my-10 mx-10">
              <SelectOption
                options={feedbackTypes}
                selectedOption={selectedFeedbackType}
                displayText="Feedback Type"
                setSelectedOption={setSelectedFeedbackType}
              />
              {/* <SelectEvent options={}/> */}
              {selectedFeedbackType === "Professor" && (
                <SelectOption
                  options={professorsNames}
                  selectedOption={selectedProfessor}
                  displayText="Professor"
                  setSelectedOption={setSelectedProfessor}
                />
              )}
              {selectedFeedbackType === "Course" && (
                <SelectOption
                  options={coursesNames}
                  selectedOption={selectedCourse}
                  displayText="Course"
                  setSelectedOption={setSelectedCourse}
                />
              )}
              {(selectedFeedbackType === "Campus Events" ||
                selectedFeedbackType === "Facilities") && (
                <TextField
                  required
                  id="outlined-required"
                  label={selectedFeedbackType}
                  onChange={(event) => {
                    setSelectedOtherEntity(event.target.value);
                  }}
                />
              )}
            </Box>
            <Box
              className="d-flex justify-content-between mx-2"
              style={{ marginBottom: "5px", marginTop: "20px" }}
            >
              <Textarea
                aria-label="minimum height"
                minRows={10}
                placeholder="Provide feedback here"
                onChange={updateText}
              />
              <Box className="d-flex flex-column justify-content-end">
                <Button
                  variant="contained"
                  //   backgroundColor="rgb(33,100,255)"
                  sx={{ backgroundColor: "rgb(33,129,246)" }}
                  endIcon={<Send />}
                  onClick={handleSubmit}
                >
                  Send
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Stack>
  );
};
export default Feedback;
