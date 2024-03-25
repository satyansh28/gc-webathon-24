import React, { useState,useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  // const userInfo = {
  //   firstName: "John Doe",
  //   lastName:
  //   email: "johndoe45@gmail.com",
  //   contact: "+91 9878766543",
  //   rollNo: "19CS02004",
  //   branch: "Computer Science",
  //   birthDate: "01/01/2001",
  //   batch: "2019",
  // };
  const [edit, setEdit] = useState(false);
  const [editUserInfo, setEditUserInfo] = useState(null);
  const [flip,setFlip]=useState(true)
  const navigator=useNavigate()

  useEffect(() => {
    fetch(
      process.env.REACT_APP_BACKEND +
        "/api/auth/myProfile", 
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
        setEditUserInfo({firstName:res.firstName,lastName:res.lastName,role:res.role,email:res.email,dob:res.dob});
      })
  },[flip]);
  const handleEdit = () => {
    console.log(editUserInfo)
    if(!edit)
      setEdit(!edit);
    else
      fetch(process.env.REACT_APP_BACKEND+"/api/student/edit",{
        method:"PUT",
        credentials:"include",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({userData:editUserInfo})
      }).then(res=>{
        setFlip(!flip)
        setEdit(!edit)
      })
  };
  if(editUserInfo==null)
    return(<Typography>Loading...</Typography>)
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
              {editUserInfo.firstName+" "+editUserInfo.lastName}
            </Typography>
            <Typography color="textSecondary" className="tauri-regular mt-1">
              {editUserInfo.email}
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
            {Object.entries(editUserInfo).map(([key, value], index) => (
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
