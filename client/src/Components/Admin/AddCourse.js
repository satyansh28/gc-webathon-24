import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  TextField,
  Button,
  Paper,
  styled,
  Typography,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 1000,
  //   height: 120,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
}));

const professorsData = [
  { name: "Manoranjan Sathpathy", email: "manoranjan@iitbbs.ac.in" },
  { name: "Srinivas Pinsetty", email: "spinsetty@iitbbs.ac.in" },
  { name: "Joy Mukherjee", email: "joy@iitbbs.ac.in" },
  { name: "Debi Prasad Dogra", email: "dpdogra@iitbbs.ac.in" },
  { name: "Padmalochan Bera", email: "plb@iitbbs.ac.in" },
  { name: "Devashree Tripathy", email: "devashreetripathy@iitbbs.ac.in" },
];
const semesterOptions = [
  {
    name: "Spring",
  },
  {
    name: "Autumn",
  },
];
const statusOptions = [
  {
    name: "ongoing",
  },
  {
    name: "open",
  },
  {
    name: "over",
  },
];
const SelectOption = (props) => {
  const { selectedOption, displayText, setSelectedOption, options } = props;
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
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
              {option.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const AddCourse = () => {
  const navigate = useNavigate();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const [professors, setProfessors] = useState(null);
  const [name, setName] = useState("");
  const [year, setYear] = useState(currentYear);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [semester, setSemester] = useState(null);
  const [status, setStatus] = useState(null);
  const [credit, setCredit] = useState(2);
  const [numberOfClasses, setNumberOfClasses] = useState(0);
  // console.log(professorsData);
  useEffect(() => {
    console.log(professorsData);
    fetch(process.env.REACT_APP_BACKEND+"/api/admin/getProfessors",{credentials:'include'})
    .then(res=>{
      if(res.status===200)
        return res.json()
      else
        window.location.href="/"
    }).then((res)=>{
      console.log(res.professorList)
      setProfessors(res.professorList.map(prof=>{return {name:prof.firstName+" "+prof.lastName,id:prof._id}}))
      setIsLoading(false);
    })
    //setProfessors(professorsData);
    // setSelectedProfessor(professors[0]);
    
  }, []);

  const handleSubmit = (event) => {
    console.log(selectedProfessor)
    fetch(process.env.REACT_APP_BACKEND+"/api/admin/addCourse",{
      method:"POST",
      credentials:'include',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ courseDetails:{
        year:year,
        semester:semester.name,
        name:name,
        instructor:[selectedProfessor.id],
        credit:credit
      } }),
    })//.then((res) => navigate("/courses"));
    event.preventDefault();
    //navigate("/courses");
  };
  if (isLoading) {
    return <Typography>Loading...</Typography>;
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
          <TextField
            required
            id="outlined-required"
            label="Course Name"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <Stack
            direction="row"
            spacing={2}
            className="d-flex justify-content-between"
          >
            <TextField
              required
              id="outlined-required"
              label="Year"
              onChange={(event) => {
                setYear(parseInt(event.target.value));
              }}
            />
            <TextField
              required
              id="outlined-required"
              label="Credits"
              onChange={(event) => {
                setCredit(parseInt(event.target.value));
              }}
            />
            <SelectOption
              options={semesterOptions}
              selectedOption={semester}
              setSelectedOption={setSemester}
              displayText="Semester"
            />
            <SelectOption
              options={statusOptions}
              selectedOption={status}
              setSelectedOption={setStatus}
              displayText="Status"
            />
            {/* <TextField
              required
              id="outlined-required"
              label="Number of classes"
              onChange={(event) => {
                setNumberOfClasses(parseInt(event.target.value));
              }}
            /> */}
            <SelectOption
              options={professors}
              selectedOption={selectedProfessor}
              setSelectedOption={setSelectedProfessor}
              displayText="Professor"
            />
            {/* <TextField required id="outlined-required" label="Middle Name" /> */}
          </Stack>

          <Box className="d-flex justify-content-end">
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={handleSubmit}
            >
              Add
            </Button>
          </Box>
        </Stack>
      </DemoPaper>
    </Box>
  );
};

export default AddCourse;
