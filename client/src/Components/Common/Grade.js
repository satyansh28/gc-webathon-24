import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
	FormControl,
	InputLabel,
	Select,
	MenuItem,
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

const gradeOptions = ["A", "B", "C", "D", "P", "F"];

const SelectOption = (props) => {
	const { options, selectedStudents, setSelectedStudents, displayText } = props;
	const currentSelectedOption = selectedStudents.filter((student) => {
		return options.roll_no === student.roll_no;
	})[0];
	const [selectedOption, setSelectedOption] = useState(currentSelectedOption);
	const handleChange = (event) => {
		// setSelectedOption(event.target.value);
		const updatedStudent = event.target.value;
		setSelectedOption(updatedStudent);
		const updatedSelectedStudents = selectedStudents.map((student) => {
			if (student.roll_no === updatedStudent.roll_no) {
				return updatedStudent;
			} else {
				return student;
			}
		});
		setSelectedStudents(updatedSelectedStudents);
	};

	// console.log(options);

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
				style={{ height: "3.5em" }}
				label={displayText}
			>
				{options.map((option, index) => {
					return (
						<MenuItem key={index} value={option} style={{ fontSize: "0.9em" }}>
							{option.grade}
						</MenuItem>
					);
				})}
			</Select>
		</FormControl>
	);
};

const Grade = () => {
	const navigate = useNavigate();
	const { id: courseId } = useParams();
	const [studentsAllOptions, setStudentsAllOptions] = useState([]);
	const [selectedStudents, setSelectedStudents] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
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
				const updatedStudentsAllOptions = studentData.map((student) => {
					return gradeOptions.map((grade) => {
						return { ...student, grade: grade };
					});
				});
				setStudentsAllOptions(updatedStudentsAllOptions);
				const initalSelectedStudents = updatedStudentsAllOptions.map(
					(studentAllOptions) => {
						return studentAllOptions[1];
					}
				);
				setSelectedStudents(initalSelectedStudents);
				setIsLoading(false);
			});
	}, [courseId]);

	const handleSubmit = async (event) => {
		// api call to send the grade details to backend
		event.preventDefault();
		const gradeData = Object.fromEntries(
			selectedStudents.map(student => [student.id, student.grade])
		);

		await fetch(
			`${process.env.REACT_APP_BACKEND}/api/academics/courses/${courseId}/grade`,
			{
				method: "POST",
				body: JSON.stringify({ grades: gradeData }),
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				credentials: "include",
			}
		);

		navigate("/courses");
	};

	let content = <></>;
	if (isLoading) {
		content = <Typography>Loading...</Typography>;
	} else if (!studentsAllOptions) {
		content = <Typography>Failed to fetch student data</Typography>;
	} else {
		const columnsDetails = [
			{ columnName: "Name", columnType: "text", align: "left" },
			{ columnName: "Roll Number", columnType: "text", align: "center" },
			{
				columnName: "Grade",
				columnType: "selectOption",
				values: ["A", "B", "C", "P", "F"],
				align: "right",
			},
		];
		content = (
			<Stack spacing={1} sx={{ height: "95vh" }}>
				<Typography variant="h4" className=" mb-4" sx={{ fontWeight: 600 }}>
					Assign Grade
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
							{studentsAllOptions.map((studentAllOptions, index) => {
								return (
									<TableRow key={index}>
										<TableCell align="left">
											{studentAllOptions[0].name}
										</TableCell>
										<TableCell align="center">
											{studentAllOptions[0].roll_no}
										</TableCell>
										<TableCell align="right">
											<SelectOption
												options={studentAllOptions}
												selectedStudents={selectedStudents}
												setSelectedStudents={setSelectedStudents}
												displayText="Grade"
											/>
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
			</Stack>
		);
	}
	return content;
};
export default Grade;
