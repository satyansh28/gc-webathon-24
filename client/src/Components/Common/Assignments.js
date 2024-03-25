import { Assignment } from "@mui/icons-material";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  DialogTitle,
} from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import UserContext from "../UserContext";
import DatePicker from "react-datepicker";
import { Add } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";

// const assigns = [
//   {
//     name: "Assignment 1",
//     due: "12/12/2021",
//   },
//   {
//     name: "Assignment 2",
//     due: "12/12/2021",
//   },
//   {
//     name: "Assignment 3",
//     due: "12/12/2021",
//   },
//   {
//     name: "Assignment 4",
//     due: "12/12/2021",
//   },
//   {
//     name: "Assignment 5",
//     due: "12/12/2021",
//   },
// ];

const defaultAssignmentDetail = {
  topic: "",
  dueDate: new Date(),
  points: 100,
  url: "",
  question: "",
};

const Assignments = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [assigns, setAssigns] = useState([]);
  const [edit, setEdit] = useState(false);
  const [assign, setAssign] = useState(defaultAssignmentDetail);
  const toDate = (date) => {
    const ndate = new Date(date);
    return ndate.toLocaleString();
  };
  useEffect(() => {
    if (user.role === "student") {
      fetch(
        process.env.REACT_APP_BACKEND +
          "/api/student/getMyAssignments?courseId=" +
          window.location.href.split("/").pop(),
        {
          credentials: "include",
        }
      )
        .then((res) => {
          if (res.status === 200) return res.json();
          else window.location.href = "/";
        })
        .then((res) => {
          console.log(res.assignmentList);
          setAssigns(res.assignmentList);
        });
    } else {
      fetch(
        process.env.REACT_APP_BACKEND +
          "/api/academics/courses/" +
          window.location.href.split("/").pop() +
          "/assignments",
        {
          credentials: "include",
        }
      )
        .then((res) => {
          if (res.status === 200) return res.json();
          else window.location.href = "/";
        })
        .then((res) => {
          console.log(res);
          setAssigns(res);
        });
    }
    //setCourses(coursesData);
  }, [user]);
  const handleAssignmentView = (index) => {
    navigate(`/courses/assignment/view/${index + 1}`);
  };
  const handleClose = () => {
    // backend call880ddcebef7c6c00f24694dce51a9945292336d1
    // save new assignment data to backend
    // on success append that data to the assigns array
    fetch(
      process.env.REACT_APP_BACKEND +
        "/api/academics/courses/" +
        window.location.href.split("/").pop() +
        "/assignments",
      {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...assign,
          points: undefined,
          dueDate: assign.dueDate.toISOString(),
          question: assign.question + "/n" + assign.url,
        }),
      }
    );
    setEdit(false);
  };

  return (
    <Box>
      <Typography variant="h4" className="oswald">
        Assignments
      </Typography>
      <Box className="d-flex justify-content-center">
        <List sx={{ mt: 4, width: "70%" }}>
          {assigns.map((assign, index) => (
            <>
              <ListItem>
                <ListItemButton onClick={() => handleAssignmentView(index)}>
                  <ListItemAvatar>
                    <Assignment className="fs-3" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box className="d-flex justify-content-between align-items-center">
                        <Typography className="tauri-regular" component="div">
                          {assign.topic}
                        </Typography>
                        <Box>
                          <Typography
                            className="tauri-regular"
                            sx={{
                              color: "rgb(100,100,100)",
                              fontSize: "0.8rem",
                            }}
                            component="div"
                          >
                            Due: {toDate(assign.dueDate)}
                          </Typography>
                          <Typography
                            className="tauri-regular"
                            sx={{
                              color: "rgb(100,100,100)",
                              fontSize: "0.8rem",
                            }}
                            component="div"
                          >
                            Points: {100}
                          </Typography>
                        </Box>
                      </Box>
                    }
                    className="oswald"
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
            </>
          ))}
          {user.role !== "student" && (
            <Box className="d-flex justify-content-center my-3 mx-1">
              <Button
                sx={{ color: "black", borderColor: "black" }}
                variant="outlined"
                startIcon={<Add />}
                onClick={(event) => {
                  setAssign(defaultAssignmentDetail);
                  setEdit(true);
                }}
              >
                Add
              </Button>
            </Box>
          )}
          <Dialog
            open={edit}
            onClose={() => setEdit(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
          >
            <DialogTitle id="alert-dialog-title" className="tauri-regular">
              Assignment Details
            </DialogTitle>
            <DialogContent>
              <TextField
                label="Topic"
                variant="standard"
                fullWidth
                sx={{ mb: 4 }}
                value={assign.topic}
                onChange={(e) =>
                  setAssign({ ...assign, topic: e.target.value })
                }
              />
              <TextField
                label="Question"
                variant="standard"
                multiline
                maxRows={4}
                fullWidth
                sx={{ mb: 4 }}
                value={assign.question}
                onChange={(e) =>
                  setAssign({ ...assign, question: e.target.value })
                }
              />
              <TextField
                label="Assignment URL"
                variant="standard"
                multiline
                maxRows={4}
                fullWidth
                sx={{ mb: 4 }}
                value={assign.url}
                onChange={(e) => setAssign({ ...assign, url: e.target.value })}
              />
              <Typography>Due Date</Typography>
              <DatePicker
                selected={assign.dueDate}
                onChange={(date) => setAssign({ ...assign, dueDate: date })}
              />
              <TextField
                label="Points"
                variant="standard"
                fullWidth
                sx={{ mb: 4, mt: 4 }}
                value={assign.points}
                onChange={(e) =>
                  setAssign({ ...assign, points: e.target.value })
                }
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEdit(false)}>Cancel</Button>
              <Button onClick={handleClose} autoFocus>
                Save
              </Button>
            </DialogActions>
          </Dialog>
          {/* <Divider /> */}
        </List>
      </Box>
    </Box>
  );
};

export default Assignments;
