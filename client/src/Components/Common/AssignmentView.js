import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import PdfIcon from "../../Assets/pdf.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../Styles/AssignmentView.css";
import { Assignment, Edit } from "@mui/icons-material";
import UserContext from "../UserContext";

const AssignmentDetail = {
  topic: "Assignment 1",
  dueDate: "12/10/2024",
  points: 100,
  url: "https://www.google.com",
  question:
    "This is the question for the assignment. This is the question for the assignment. This is the question for the assignment. This is the question for the assignment.",
};

const students = [
  "Student 1",
  "Student 2",
  "Student 3",
  "Student 4",
  "Student 5",
  "Student 6",
];

const StudentList = ({ setStudent }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  return (
    <Box>
      <Typography variant="h5" className="oswald">
        Students
      </Typography>
      <List sx={{ overflow: "scroll", height: "68vh" }}>
        {students.map((student, index) => (
          <>
            <ListItem key={index}>
              <ListItemButton onClick={() => setStudent(index)}>
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box>
                      <Typography className="tauri-regular ms-5">
                        {student}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography className="tauri-regular ms-5">
                        {student}
                      </Typography>
                    </Box>
                  }
                />
              </ListItemButton>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </Box>
  );
};

const Submission = ({ user, submission, points, setSubmission }) => {
  return (
    <Box className="d-flex align-items-center flex-column">
      <Box sx={{ mt: 5 }}>
        {submission.url && (
          <Link
            to={submission.url}
            target="_blank"
            className="text-decoration-none ms-2"
          >
            <Box className="d-flex align-items-center border py-2 pe-3 ps-1 rounded assignmentPdf">
              <Box sx={{ mr: 5 }}>
                <img src={PdfIcon} alt="PDF" width="50px" height="50px" />
              </Box>
              <Typography className="tauri-regular">Submission</Typography>
            </Box>
          </Link>
        )}
      </Box>
      <Box sx={{ height: "100px", overflowY: "auto" }}>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          {submission.answer}
        </Typography>
      </Box>
      <Box sx={{ mt: 5 }}>
        {user.role === "prof" ? (
          <TextField
            label="Score"
            sx={{ m: 1 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">/ {points}</InputAdornment>
              ),
            }}
            value={submission.score}
            onChange={(e) =>
              setSubmission({ ...submission, score: e.target.value })
            }
          />
        ) : (
          <Typography variant="h6" className="oswald">
            Score: {submission.score}
          </Typography>
        )}
      </Box>
      <Button variant="contained" sx={{ mt: 5 }} disableElevation>
        Submit
      </Button>
    </Box>
  );
};

const AssignmentView = () => {
  const { id } = useParams();
  const [edit, setEdit] = useState(false);
  const [assign, setAssign] = useState(AssignmentDetail);
  const [submission, setSubmission] = useState({
    score: 0,
    url: "https://www.google.com",
    answer:
      "This is the answer for the assignment. This is the answer for the assignment. This is the answer for the assignment. This is the answer for the assignment.",
  });
  const [activeStu, setActiveStu] = useState();
  const { user, updateUser } = useContext(UserContext);

  const handleClose = () => {
    setEdit(false);
  };

  return (
    <Box sx={{ height: "95vh", overflow: "hidden" }}>
      <Typography variant="h4" className="oswald">
        Assignment {id}
      </Typography>
      <Grid container sx={{ mt: 5, mb: 5 }}>
        <Grid item xs className="d-flex">
          {AssignmentDetail.url && (
            <Link
              to={AssignmentDetail.url}
              target="_blank"
              className="text-decoration-none ms-2"
            >
              <Box className="d-flex align-items-center border py-2 pe-3 ps-1 rounded assignmentPdf">
                <Box sx={{ mr: 2 }}>
                  <img src={PdfIcon} alt="PDF" width="50px" height="50px" />
                </Box>
                <Typography
                  className="tauri-regular"
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "12ch",
                  }}
                >
                  {AssignmentDetail.topic}
                </Typography>
              </Box>
            </Link>
          )}
          {AssignmentDetail.question && (
            <Box sx={{ height: "60px", overflowY: "auto" }}>
              <Typography variant="subtitle1" sx={{ ml: 1, mr: 3 }}>
                {AssignmentDetail.question}
              </Typography>
            </Box>
          )}
        </Grid>
        <Grid item className="d-flex align-items-center">
          <Box sx={{ mr: 3 }}>
            <Typography
              className="tauri-regular"
              sx={{ color: "rgb(100,100,100)" }}
            >
              Due: {AssignmentDetail.dueDate}
            </Typography>
            <Typography
              className="tauri-regular"
              sx={{ color: "rgb(100,100,100)" }}
            >
              Points: {AssignmentDetail.points}
            </Typography>
          </Box>
          {user.role === "prof" && (
            <Button
              variant="contained"
              startIcon={<Edit />}
              onClick={() => setEdit(true)}
            >
              Edit
            </Button>
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
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {user.role === "prof" && (
          <Grid item xs={5}>
            <StudentList setStudent={setActiveStu} />
          </Grid>
        )}
        <Grid item xs={user.role === "prof" ? 7 : 12}>
          <Submission
            user={user}
            submission={submission}
            points={assign.points}
            setSubmission={setSubmission}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AssignmentView;
