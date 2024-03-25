import React, { useState, useContext, useEffect } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  ListItemButton,
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import UserContext from "../UserContext";
import "../../Styles/ViewFeedback.css";

const feedbackTypes = {
  admin: ["Course", "Professor", "Campus Events"],
  prof: ["Course", "Professor"],
};

const adminFeedbackData = {
  Course: [
    {
      name: "Applied Graph Theory",
      text: "Applied Graph Theory involves the practical utilization of graph theory concepts and algorithms to solve real-world problems which were taught very well",
    },
    {
      name: "Applied Graph Theory",
      text: "Applied Graph Theory involves the practical utilization of graph theory concepts and algorithms to solve real-world problems which were taught very well",
    },
    {
      name: "Applied Graph Theory",
      text: "Applied Graph Theory involves the practical utilization of graph theory concepts and algorithms to solve real-world problems which were taught very well",
    },
    {
      name: "Applied Graph Theory",
      text: "Applied Graph Theory involves the practical utilization of graph theory concepts and algorithms to solve real-world problems which were taught very well",
    },
  ],
  Professor: [
    { name: "Joy Mukherjee", text: "Explained the concepts clearly." },
    { name: "Joy Mukherjee", text: "Explained the concepts clearly." },
    { name: "Joy Mukherjee", text: "Explained the concepts clearly." },
    { name: "Joy Mukherjee", text: "Explained the concepts clearly." },
  ],
  CampusEvents: [
    { name: "GC", text: "Organised in an excellent manner." },
    { name: "GC", text: "Organised in an excellent manner." },
    { name: "GC", text: "Organised in an excellent manner." },
    { name: "GC", text: "Organised in an excellent manner." },
  ],
};

const profFeedbackData = {
  Course: [
    {
      name: "Applied Graph Theory",
      text: "Applied Graph Theory involves the practical utilization of graph theory concepts and algorithms to solve real-world problems which were taught very well. Applied Graph Theory involves the practical utilization of graph theory concepts and algorithms to solve real-world problems which were taught very well. Applied Graph Theory involves the practical utilization of graph theory concepts and algorithms to solve real-world problems which were taught very well. Applied Graph Theory involves the practical utilization of graph theory concepts and algorithms to solve real-world problems which were taught very well. Applied Graph Theory involves the practical utilization of graph theory concepts and algorithms to solve real-world problems which were taught very well. Applied Graph Theory involves the practical utilization of graph theory concepts and algorithms to solve real-world problems which were taught very well. ",
    },
    {
      name: "Applied Graph Theory",
      text: "Applied Graph Theory involves the practical utilization of graph theory concepts and algorithms to solve real-world problems which were taught very well",
    },
    {
      name: "Applied Graph Theory",
      text: "Applied Graph Theory involves the practical utilization of graph theory concepts and algorithms to solve real-world problems which were taught very well",
    },
    {
      name: "Applied Graph Theory",
      text: "Applied Graph Theory involves the practical utilization of graph theory concepts and algorithms to solve real-world problems which were taught very well",
    },
  ],
  Professor: [
    { name: "Joy Mukherjee", text: "Explained the concepts clearly." },
    { name: "Joy Mukherjee", text: "Explained the concepts clearly." },
    { name: "Joy Mukherjee", text: "Explained the concepts clearly." },
    { name: "Joy Mukherjee", text: "Explained the concepts clearly." },
  ],
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const CustomDialog = (props) => {
  const { title, body, openDialog, setOpenDialog } = props;
  const handleClose = () => {
    setOpenDialog(false);
  };
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Typography className="tauri-regular" style={{ fontSize: "20px" }}>
            {title}
          </Typography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography className="tauri-regular" gutterBottom>
            {body}
          </Typography>
          {/* <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
            auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
            cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
            dui. Donec ullamcorper nulla non metus auctor fringilla.
          </Typography> */}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};

const FeedbackItem = (props) => {
  const { name, text } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const handleClick = () => {
    setOpenDialog(true);
  };
  const marginTopValue = name === "" ? "2px" : "20px";

  return (
    <>
      <ListItemButton
        alignItems="flex-start"
        // style={{ backgroundColor: "grey" }}
      >
        <Box className="d-flex flex-column justify-content-center">
          <AccountBoxIcon
            sx={{ height: "100%" }}
            style={{ marginTop: `${marginTopValue}`, marginRight: "15px" }}
          />
        </Box>
        <ListItemText
          style={{ width: "100%" }}
          onClick={handleClick}
          primary={
            <Typography
              style={{ fontSize: "17px", fontWeight: 700 }}
              className="tauri-regular"
            >
              {name}
            </Typography>
          }
          secondary={
            <Box>
              <Typography
                className="text tauri-regular"
                // sx={{ display: "inline" }}
                // component="span"
                variant="body2"
                color="text.primary"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontSize: "1em",
                  marginTop: "7px",
                  fontWeight: 300,
                  //   marginLeft: "5px",
                }}
              >
                {text}
              </Typography>
            </Box>
          }
        />
      </ListItemButton>
      <CustomDialog
        title={name}
        body={text}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </>
  );
};

const ViewFeedback = () => {
  const { user } = useContext(UserContext);
  const [feedbackType, setFeedbackType] = useState("Professor");
  const [feedbacks, setFeedbacks] = useState(null);

  useEffect(() => {
    if (user.role === "staff") {
      setFeedbacks(profFeedbackData);
    } else if (user.role === "admin") {
      // setFeedbacks(adminFeedbackData);
      fetch(process.env.REACT_APP_BACKEND + "/api/admin/getFeedbacks", {
        credentials: "include",
      })
        .then((res) => {
          if (res.status === 200) return res.json();
          else {
            window.location.href = "/";
          }
        })
        .then((res) => {
          console.log(res);
          setFeedbacks({
            Course: res.courseList.map((event) => {
              return { name: event.actorId.name, text: event.review };
            }),
            Professor: res.proffesorList.map((event) => {
              return {
                name: event.actorId.firstName + " " + event.actorId.lastName,
                text: event.review,
              };
            }),
            CampusEvents: res.eventList,
          });
        });
    }
  }, []);

  const handleChange = (event, newFeedbackType) => {
    setFeedbackType(newFeedbackType);
  };
  const feedbackTypeKey = feedbackType.split(" ").join("");
  console.log(feedbackTypeKey);
  let currentTypeFeedbacks =
    feedbacks === null ? [] : feedbacks[feedbackTypeKey];
  console.log(currentTypeFeedbacks);
  let feedbackItemElements = <></>;
  if (currentTypeFeedbacks != null && currentTypeFeedbacks.length >= 1) {
    const firstFeedback = currentTypeFeedbacks[0];
    currentTypeFeedbacks = currentTypeFeedbacks.filter((feedback, index) => {
      return index >= 1;
    });
    feedbackItemElements = (
      <>
        {/* <Divider /> */}
        <FeedbackItem
          name={user.role === "staff" ? "" : firstFeedback.name}
          text={firstFeedback.text}
        />
        {currentTypeFeedbacks.map((feedback, index) => {
          return (
            <>
              <Divider />
              <FeedbackItem
                name={user.role === "staff" ? "" : firstFeedback.name}
                text={feedback.text}
              />
            </>
          );
        })}
        <Divider />
      </>
    );
  }
  return (
    <Box>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={feedbackType}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="secondary tabs example"
        >
          {feedbackTypes[user.role].map((type, index) => {
            return <Tab key={index} value={type} label={type} />;
          })}
        </Tabs>
        <List
          sx={{ width: "100%", maxWidth: 1000, bgcolor: "background.paper" }}
        >
          {feedbackItemElements}
        </List>
      </Box>
    </Box>
  );
};
export default ViewFeedback;
