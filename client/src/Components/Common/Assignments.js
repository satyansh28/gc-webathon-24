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
} from "@mui/material";
import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../UserContext";

const assigns = [
  {
    name: "Assignment 1",
    due: "12/12/2021",
  },
  {
    name: "Assignment 2",
    due: "12/12/2021",
  },
  {
    name: "Assignment 3",
    due: "12/12/2021",
  },
  {
    name: "Assignment 4",
    due: "12/12/2021",
  },
  {
    name: "Assignment 5",
    due: "12/12/2021",
  },
];

const Assignments = () => {
  const courseId = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const handleAssignmentView = (index) => {
    navigate(`/courses/assignment/view/${index + 1}`);
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
                          {assign.name}
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
                            Due: {assign.due}
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
        </List>
      </Box>
    </Box>
  );
};

export default Assignments;
