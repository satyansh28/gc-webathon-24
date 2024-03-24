import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Edit } from "@mui/icons-material";

const Profile = () => {
  const userInfo = {
    name: "John Doe",
    email: "johndoe45@gmail.com",
    contact: "+91 9878766543",
    rollNo: "19CS02004",
    branch: "Computer Science",
    birthDate: "01/01/2001",
    batch: "2019",
  };
  const [edit, setEdit] = useState(false);
  const [editUserInfo, setEditUserInfo] = useState(userInfo);

  const handleEdit = () => {
    setEdit(!edit);
  };

  return (
    <Box className="container" sx={{ height: "95vh", overflow: "hidden" }}>
      <Typography variant="h4" className="oswald mb-4">
        Profile
      </Typography>
      <Box sx={{ my: 5, height: "80%", overflowY: "scroll" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} className="text-center py-5">
            <Avatar
              src="/path-to-user-image.jpg"
              className="mx-auto"
              style={{ width: "200px", height: "200px" }}
            />
            <Typography variant="h5" className="tauri-regular mt-4">
              {userInfo.name}
            </Typography>
            <Typography color="textSecondary" className="tauri-regular mt-1">
              {userInfo.rollNo}
            </Typography>
            <Typography color="textSecondary" className="mb-2">
              {userInfo.country}
            </Typography>
            <Box>
              <Button
                variant="contained"
                className="shadow-lg"
                startIcon={<Edit />}
                onClick={handleEdit}
                sx={{ mt: 10 }}
              >
                {edit ? "Save" : "Edit"}
              </Button>
              {/* ADD CANCEL BUTTON HERE */}
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            {Object.entries(userInfo).map(([key, value], index) => (
              <React.Fragment key={key}>
                <Grid
                  container
                  className={`align-items-center py-${
                    edit ? "0" : "4"
                  } px-5 rounded`}
                  sx={{
                    bgcolor: `${
                      index % 2 === 0 ? "rgba(187, 209, 247, 0.5)" : ""
                    }`,
                  }}
                >
                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle2"
                      className="text-capitalize tauri-regular text-secondary"
                    >
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </Typography>
                  </Grid>
                  <Grid item>
                    {!edit ? (
                      <Typography variant="subtitle1" className="tauri-regular">
                        {value}
                      </Typography>
                    ) : (
                      <TextField
                        label={key
                          .replace(/([A-Z])/g, " $1")
                          .trim()
                          .toUpperCase()}
                        variant="outlined"
                        fullWidth
                        sx={{ my: 3, backgroundColor: "white" }}
                        value={editUserInfo[key]}
                        onChange={(e) =>
                          setEditUserInfo({
                            ...editUserInfo,
                            [key]: e.target.value,
                          })
                        }
                      />
                    )}
                  </Grid>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;
