import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState, useContext } from "react";
import Lottie from "react-lottie";
import animationData from "../Animations/Animation.json";
import "../Styles/Login.css";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const student_details = {
  email: "shv12@iitbbs.ac.in",
  role: "student",
  id: "19CS02004",
};
const professor_details = {
  email: "spinsetty@iitbbs.ac.in",
  role: "staff",
};

const admin_details = {
  email: "jsk12@iitbbs.ac.in",
  role: "admin",
};

const Login = () => {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    // Do api call to fetch user details
    console.log(process.env.REACT_APP_BACKEND);
    const response = await fetch(
      process.env.REACT_APP_BACKEND + "/api/auth/login",
      {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginInfo.email,
          password: loginInfo.password,
        }),
      }
    );
    if (!(response.status === 200)) alert("Invalid username or password!");
    else {
      const data = await response.json();
      console.log(data);
      updateUser({ role: data.role, email: data.email });
    }
    // console.log(student_details);
    // if (loginInfo.email === "shv12@iitbbs.ac.in") {
    //   updateUser(student_details);
    // } else if (loginInfo.email === "spinsetty@iitbbs.ac.in") {
    //   updateUser(professor_details);
    // } else if (loginInfo.email === "jsk12@iitbbs.ac.in") {
    //   updateUser(admin_details);
    // }
    // console.log(user);
    console.log(loginInfo);
    navigate("/courses");
  };

  return (
    <Box
      className="d-flex align-items-center justify-content-center"
      sx={{ height: "100vh", position: "relative" }}
    >
      <div className="curveContainer">
        <div className="curve1" />
        <div className="curve2" />
        <div className="curve3" />
      </div>
      <Box className="lottieAnim" xs={5}>
        <Lottie options={defaultOptions} height={600} width={600} />
      </Box>
      <form
        style={{ width: "40vw" }}
        className="rounded shadow-lg overflow-hidden text-center loginForm px-3 py-4"
      >
        <Typography
          variant="h2"
          className="tauri-regular"
          sx={{ color: "white", textShadow: "2px 2px 4px #000000" }}
        >
          ERP
        </Typography>
        <Box>
          <TextField
            label="Email"
            variant="filled"
            fullWidth
            sx={{ my: 3, backgroundColor: "white" }}
            value={loginInfo.email}
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, email: e.target.value })
            }
          />
          <TextField
            label="Password"
            type="password"
            variant="filled"
            sx={{ backgroundColor: "white" }}
            fullWidth
            value={loginInfo.password}
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, password: e.target.value })
            }
          />
        </Box>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            className="shadow loginBtn"
            onClick={handleLogin}
            type="submit"
          >
            <Typography variant="h6" className="tauri-regular">
              Login
            </Typography>
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
