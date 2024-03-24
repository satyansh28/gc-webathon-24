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
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

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
          <Stack direction="row" className="d-flex justify-content-between">
            <TextField required id="outlined-required" label="First Name" />
            <TextField required id="outlined-required" label="Middle Name" />
            <TextField required id="outlined-required" label="Last Name" />
          </Stack>
          <TextField
            required
            id="outlined-required"
            label="Institute email-id"
          />
          {!checked && (
            <TextField required id="outlined-required" label="Roll Number" />
          )}
          <TextField required id="outlined-required" label="Branch" />
          <Box className="d-flex justify-content-end">
            <Button variant="outlined" startIcon={<Add />}>
              Add
            </Button>
          </Box>
        </Stack>
      </DemoPaper>
    </Box>
  );
};
export default SignUp;
