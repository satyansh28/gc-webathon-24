import React from "react";
import {
  Stack,
  Paper,
  styled,
  Box,
  TextField,
  Checkbox,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const newUser={firstName:"",lastName:"",role:"student",email:"",Branch:""}

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 1000,
  //   height: 120,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
}));

function generateRandomPassword(length) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*?";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

// Example usage:
const password = generateRandomPassword(12); // Generates a random password of length 12
console.log(password);

const SignUp = () => {
  const navigate = useNavigate();

  const [checked, setChecked] = React.useState(false);
  const addUser=()=>{
    newUser.role=checked?"staff":"student"
    console.log(newUser)

    if(!(newUser.firstName!=="" && newUser.lastName!=="" && newUser.email!==""))
      alert("Please fill in all details")
    else{
      const password=generateRandomPassword(10);
      newUser.password=password
      fetch(process.env.REACT_APP_BACKEND+"/api/auth/register",{
        method:"POST",
        credentials:"include",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({userData:newUser})
      }).then(res=>{      
        alert("Password generated and sent via email:"+password)
        navigate("/courses")
    })
    }

  }
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const setFirstName=(e)=>{
    newUser.firstName=e.target.value
  }
  const setLastName=(e)=>{
    newUser.lastName=e.target.value
  }
  const setEmail=(e)=>{
    newUser.email=e.target.value
  }
  return (
    <Box className="d-flex justify-content-center">
      <DemoPaper
        className="shadow my-5"
        component="form"
        //   sx={{
        //     "& .MuiTextField-root": { m: 1, width: "45ch" },
        //   }}
      >
        <Stack spacing={2}>
          {/* <Typography variant="h6" className="oswald mb-4">
            Signup
          </Typography> */}
          <Box className="d-flex justify-content-end">
            <Typography className="my-2">
              Check the box to add Professor
            </Typography>
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Box>
          <Stack direction="row" className="justify-content-between">
            <TextField width="40" onChange={setFirstName} required id="outlined-required" label="First Name" />
            <TextField width="40" onChange={setLastName} required id="outlined-required" label="Last Name" />
          </Stack>
          <TextField
            onChange={setEmail}
            required
            id="outlined-required"
            label="Institute email-id"
          />
          {!checked && (
            <TextField required id="outlined-required" label="Roll Number" />
          )}
          <TextField required id="outlined-required" label="Branch" />
          <Box className="d-flex justify-content-end">
            <Button variant="outlined" onClick={addUser} startIcon={<Add />}>
              Add
            </Button>
          </Box>
        </Stack>
      </DemoPaper>
    </Box>
  );
};
export default SignUp;
