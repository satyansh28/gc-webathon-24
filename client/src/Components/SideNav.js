import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import "../Styles/SideNav.css";
import { ArrowDropDown } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
  AutoStories,
  LocalLibrary,
  Assignment,
  Feedback,
  SportsTennis,
} from "@mui/icons-material";

const Sections = {
  student: [
    { name: "Courses", link: "/courses", icon: <AutoStories /> },
    {
      name: "Register Course",
      link: "/register-for-courses",
      icon: <LocalLibrary />,
    },
    { name: "Assignments", link: "/courses/assignment", icon: <Assignment /> },
    { name: "Feedback", link: "/feedback", icon: <Feedback /> },
    { name: "SAC Equipments", link: "/sac", icon: <SportsTennis /> },
  ],
};

const SideNav = () => {
  const [active, setActive] = useState("Courses");

  return (
    <Box>
      <Container className="sidenav" sx={{ m: 2, overflow: "hidden" }}>
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
          <Accordion>
            <AccordionSummary expandIcon={<ArrowDropDown />}>
              <Grid container spacing={2} className="align-items-center">
                <Grid item>
                  <Avatar />
                </Grid>
                <Grid item>
                  <Typography variant="h6">John Doe</Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ px: 2, py: 1 }} className="rounded border-bottom">
                <Link to="/view_profile" className="text-decoration-none">
                  <Typography variant="button" sx={{ color: "black" }}>
                    View Profile
                  </Typography>
                </Link>
              </Box>
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
          {Sections.student.map((section) => (
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
                <Grid
                  item
                  sx={{
                    color: "white",
                    mr: 2,
                  }}
                >
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
      </Container>
    </Box>
  );
};

export default SideNav;
