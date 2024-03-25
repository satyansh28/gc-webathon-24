import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Avatar,
	Box,
	Button,
	Container,
	Divider,
	Grid,
	Tooltip,
	Typography,
} from "@mui/material";
import React, { useState, useContext } from "react";
import "../Styles/SideNav.css";
import { ArrowDropDown } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
	AutoStories,
	LocalLibrary,
	Assignment,
	Feedback,
	SportsTennis,
	Logout,
	PersonAdd,
} from "@mui/icons-material";
import { LuBookPlus } from "react-icons/lu";
import UserContext from "./UserContext";

const Sections = {
	student: [
		{ name: "Courses", link: "/courses", icon: <AutoStories /> },
		{ name: "Register Course", link: "/register", icon: <LocalLibrary /> },
		// { name: "Assignments", link: "/assignments", icon: <Assignment /> },
		{ name: "Feedback", link: "/feedback", icon: <Feedback /> },
		{ name: "SAC Equipments", link: "/sac", icon: <SportsTennis /> },
	],
	staff: [
		{ name: "Courses", link: "/courses/", icon: <AutoStories /> },
		{ name: "Feedback", link: "/view-feedback", icon: <Feedback /> },
	],
	admin: [
		{ name: "Courses", link: "/courses/", icon: <AutoStories /> },
		{ name: "Feedback", link: "/view-feedback", icon: <Feedback /> },
		{ name: "Sign up", link: "/signup", icon: <PersonAdd /> },
		{
			name: "Add Course",
			link: "/add-course",
			icon: <LuBookPlus fontSize="large" />,
		},
	],
};

const SideNav = () => {
	const [active, setActive] = useState("Courses");
	const { user, updateUser } = useContext(UserContext);
	const handleLogout = async () => {
		// setUser(null);
		await fetch(process.env.REACT_APP_BACKEND + "/api/auth/logout", {
			credentials: "include",
		});

		updateUser(null);
		//
		//
		window.location.href = "/";
	};

	return (
		<Box>
			<Container
				className="sidenav"
				sx={{ m: 2, overflow: "hidden", position: "relative" }}
			>
				<Container sx={{ py: 2 }} className="border-bottom text-center">
					<Typography
						variant="h3"
						className="tauri-regular"
						sx={{
							color: "white",
							textShadow: "2px 2px 4px rgba(255, 255, 255, 0.5)",
						}}
					>
						ERP
					</Typography>
				</Container>
				<Box sx={{ py: 2 }} className="border-bottom">
					<Accordion className="profileAcc">
						<AccordionSummary expandIcon={<ArrowDropDown />}>
							<Grid container spacing={2} className="align-items-center">
								<Grid item>
									<Avatar />
								</Grid>
								<Grid item>
									<Tooltip
										title={
											<Typography variant="body1">{user.email}</Typography>
										}
										placement="right"
										arrow
									>
										<Typography
											variant="h6"
											sx={{
												color: "white",
												textOverflow: "ellipsis",
												whiteSpace: "nowrap",
												overflow: "hidden",
												maxWidth: "10ch",
											}}
										>
											{user.email}
										</Typography>
									</Tooltip>
								</Grid>
							</Grid>
						</AccordionSummary>
						<AccordionDetails>
							<Box sx={{ px: 2, py: 1 }} className="rounded">
								<Link to="/view_profile" className="text-decoration-none">
									<Typography variant="button" sx={{ color: "black" }}>
										View Profile
									</Typography>
								</Link>
							</Box>
							<Divider />
							<Box sx={{ mt: 1, px: 2, py: 1 }} className="rounded">
								<Link to="/edit_profile" className="text-decoration-none">
									<Typography variant="button" sx={{ color: "black" }}>
										Edit Profile
									</Typography>
								</Link>
							</Box>
						</AccordionDetails>
					</Accordion>
				</Box>
				<Box sx={{ mt: 4 }} className="sidenav-content">
					{Sections[user.role].map((section) => (
						<Link
							to={section.link}
							className="text-decoration-none"
							onClick={() => setActive(section.name)}
						>
							<Grid
								container
								sx={{ mb: 3, p: 2 }}
								className={`rounded align-items-center ${
									active === section.name ? "sidenav-active" : ""
								}`}
							>
								<Grid item sx={{ color: "white", mr: 2 }}>
									{section.icon}
								</Grid>
								<Grid item>
									<Typography variant="button" sx={{ color: "white" }}>
										{section.name}
									</Typography>
								</Grid>
							</Grid>
						</Link>
					))}
				</Box>
				<Box sx={{ position: "absolute", left: 30, right: 30, bottom: 30 }}>
					<Button
						variant="contained"
						disableElevation
						startIcon={<Logout />}
						onClick={handleLogout}
						sx={{ width: "100%" }}
					>
						Logout
					</Button>
				</Box>
			</Container>
		</Box>
	);
};

export default SideNav;
