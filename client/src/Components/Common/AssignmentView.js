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
import React, { useState, useContext, useEffect } from "react";
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
		<Box sx={{ height: "100%" }}>
			<Typography variant="h5" className="oswald">
				Students
			</Typography>

			<List sx={{ height: "95%", overflowY: "auto" }}>
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

const Submission = ({ user, points, studentId }) => {
	const [submission, setSubmission] = useState({
		score: 0,
		url: "https://www.google.com",
		answer:
			"This is the answer for the assignment. This is the answer for the assignment. This is the answer for the assignment. This is the answer for the assignment.",
	});
	const [editSubmission, setEditSubmission] = useState(submission);
	const [uploadEdit, setUploadEdit] = useState(false);

	useEffect(() => {
		// backend call
		// fetch submission details for the student and update submission state variable
	}, []);

	const handleUploadClose = () => {
		setSubmission(editSubmission);
		setUploadEdit(false);
	};

	const handleUploadOpen = () => {
		setEditSubmission(submission);
		setUploadEdit(true);
	};

	const handleSubmit = () => {
		if (user.role !== "student") {
			console.log("Student Submission", submission);
			// backend call
			// make api call to submit the assignment
		} else {
			console.log("Prof Submission", `score: ${submission.score}`);
			// backend call
			// make api call to score the assignment for prof
		}
	};

	// IF NO STUDENT IS SELECTED SHOW MESSAGE
	if (studentId === -1 && user.role !== "prof") {
		return (
			<Box
				className="d-flex align-items-center justify-content-center flex-column"
				sx={{ height: "100%" }}
			>
				<Typography variant="h6" className="tauri-regular">
					Select a student to view submission
				</Typography>
			</Box>
		);
	}

	return (
		<Box className="d-flex align-items-center flex-column">
			{user.role !== "prof" && (
				<Box sx={{ mt: 3, width: "100%" }}>
					<Typography className="tauri-regular">
						{students[studentId]}
					</Typography>
				</Box>
			)}
			{/* SUBMISSION URL */}
			<Box
				sx={{ mt: user.role !== "prof" ? 2 : 5, width: "70%" }}
				className="d-flex align-items-center justify-content-around"
			>
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
				{/* BUTTON TO UPLOAD ANSWER */}
				{user.role !== "student" && (
					<Button
						variant="outlined"
						color="secondary"
						onClick={handleUploadOpen}
					>
						Upload
					</Button>
				)}
				{/* DIALOG FOR UPLOADING ASSIGNMENT */}
				<Dialog
					open={uploadEdit}
					onClose={() => setUploadEdit(false)}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
					fullWidth
				>
					<DialogTitle id="alert-dialog-title" className="tauri-regular">
						Submission
					</DialogTitle>
					<DialogContent>
						<TextField
							label="Answer Text"
							variant="standard"
							multiline
							maxRows={4}
							fullWidth
							sx={{ mb: 4 }}
							value={editSubmission.answer}
							onChange={(e) =>
								setEditSubmission({ ...editSubmission, answer: e.target.value })
							}
						/>
						<TextField
							label="PDF URL"
							variant="standard"
							multiline
							maxRows={4}
							fullWidth
							sx={{ mb: 4 }}
							value={editSubmission.url}
							onChange={(e) =>
								setEditSubmission({ ...editSubmission, url: e.target.value })
							}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => setUploadEdit(false)}>Cancel</Button>
						<Button onClick={handleUploadClose} autoFocus>
							Save
						</Button>
					</DialogActions>
				</Dialog>
			</Box>
			{/* SUBMISSION TEXT */}
			{submission.answer && (
				<Box sx={{ height: "100px", overflowY: "auto" }}>
					<Typography variant="subtitle1" sx={{ mt: 2 }}>
						{submission.answer}
					</Typography>
				</Box>
			)}
			{/* SCORE FOR ASSIGNMENT */}
			<Box sx={{ mt: 5 }}>
				{user.role !== "prof" ? (
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
			{/* SUBMIT BUTTON */}
			<Button
				variant="contained"
				sx={{ mt: 5 }}
				disableElevation
				onClick={handleSubmit}
			>
				Submit
			</Button>
		</Box>
	);
};

const AssignmentView = () => {
	const { id } = useParams();
	const [edit, setEdit] = useState(false);
	const [assign, setAssign] = useState(AssignmentDetail);
	const [editAssign, setEditAssign] = useState(assign);

	const [activeStu, setActiveStu] = useState(-1);
	const { user, updateUser } = useContext(UserContext);

	const handleAssignClose = () => {
		// backend call
		// write backend query to save changes to the assignment
    // store to assign state variable
		setAssign(editAssign);
		setEdit(false);
	};

	const handleAssignOpen = () => {
		setEditAssign(assign);
		setEdit(true);
	};

	return (
		<Box sx={{ height: "95vh" }} className="overflow-hidden d-flex flex-column">
			<Typography variant="h4" className="oswald">
				Assignment {id}
			</Typography>
			<Grid container sx={{ mt: 5, mb: 5 }}>
				<Grid item xs className="d-flex">
					{/* ASSIGNMENT PDF URL */}
					{assign.url && (
						<Link
							to={assign.url}
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
									{assign.topic}
								</Typography>
							</Box>
						</Link>
					)}
					{/* ASSIGNMENT QUESTION TEXT */}
					{assign.question && (
						<Box sx={{ height: "60px", overflowY: "auto" }}>
							<Typography variant="subtitle1" sx={{ ml: 1, mr: 3 }}>
								{assign.question}
							</Typography>
						</Box>
					)}
				</Grid>
				{/* ASSIGNMENT DETAILS */}
				<Grid item className="d-flex align-items-center">
					<Box sx={{ mr: 3 }}>
						<Typography
							className="tauri-regular"
							sx={{ color: "rgb(100,100,100)" }}
						>
							Due: {assign.dueDate}
						</Typography>
						<Typography
							className="tauri-regular"
							sx={{ color: "rgb(100,100,100)" }}
						>
							Points: {assign.points}
						</Typography>
					</Box>
					{user.role !== "prof" && (
						<Button
							variant="contained"
							startIcon={<Edit />}
							onClick={handleAssignOpen}
						>
							Edit
						</Button>
					)}
					{/* DIALOG TO EDIT ASSIGNMENT DETAILS */}
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
								value={editAssign.topic}
								onChange={(e) =>
									setEditAssign({ ...editAssign, topic: e.target.value })
								}
							/>
							<TextField
								label="Question"
								variant="standard"
								multiline
								maxRows={4}
								fullWidth
								sx={{ mb: 4 }}
								value={editAssign.question}
								onChange={(e) =>
									setEditAssign({ ...editAssign, question: e.target.value })
								}
							/>
							<TextField
								label="Assignment URL"
								variant="standard"
								multiline
								maxRows={4}
								fullWidth
								sx={{ mb: 4 }}
								value={editAssign.url}
								onChange={(e) =>
									setEditAssign({ ...editAssign, url: e.target.value })
								}
							/>
							<Typography>Due Date</Typography>
							<DatePicker
								selected={new Date(editAssign.dueDate)}
								onChange={(date) =>
									setEditAssign({ ...editAssign, dueDate: date })
								}
							/>
							<TextField
								label="Points"
								variant="standard"
								fullWidth
								sx={{ mb: 4, mt: 4 }}
								value={editAssign.points}
								onChange={(e) =>
									setEditAssign({ ...editAssign, points: e.target.value })
								}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={() => setEdit(false)}>Cancel</Button>
							<Button onClick={handleAssignClose} autoFocus>
								Save
							</Button>
						</DialogActions>
					</Dialog>
				</Grid>
			</Grid>
			<Grid container spacing={2} className="flex-grow-1 overflow-hidden">
				{user.role !== "prof" && (
					<Grid item xs={5} sx={{ height: "100%" }}>
						<StudentList setStudent={setActiveStu} />
					</Grid>
				)}
				<Grid item xs={user.role !== "prof" ? 7 : 12}>
					<Submission
						user={user}
						points={assign.points}
						studentId={activeStu}
					/>
				</Grid>
			</Grid>
		</Box>
	);
};

export default AssignmentView;
