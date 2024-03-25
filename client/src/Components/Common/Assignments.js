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
  dueDate: "12/10/2024",
  points: 100,
  url: "https://www.google.com",
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
    //setCourses(coursesData);
  }, [user]);
  const handleAssignmentView = (index) => {
    navigate(`/courses/assignment/view/${index + 1}`);
  };
  const handleClose = () => {
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
          {user.role === "prof" && (
            <Box className="d-flex justify-content-center my-3 mx-1">
              <Button
                sx={{ color: "black", borderColor: "black" }}
                variant="outlined"
                startIcon={<Add />}
                onClick={(event) => {
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
