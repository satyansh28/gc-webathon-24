import "./Styles/App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import { Grid } from "@mui/material";
import SideNav from "./Components/SideNav";
import Courses from "./Components/Students/Courses";
import UserContext from "./Components/UserContext";
import TakeAttendance from "./Components/Profs/TakeAttendance";
import Assignments from "./Components/Common/Assignments";
import AssignmentView from "./Components/Common/AssignmentView";
import CoursesRegistrationForm from "./Components/Students/CoursesRegistrationForm";

const App = () => {
  const [user, setUser] = useState(null);

  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      <Router>
        {!user ? (
          <Routes>
            <Route path="*" element={<Login />} />
          </Routes>
        ) : (
          <Grid container>
            <Grid item xs={2.2}>
              <SideNav user={user} />
            </Grid>
            <Grid item xs className="mx-5 my-3">
              <Routes>
                <Route path="/courses" element={<Courses />} />
                {user.role === "prof" && (
                  <Route
                    path="/take-attendance/:courseId"
                    element={<TakeAttendance />}
                  />
                )}
                {user.role === "student" && (
                  <Route
                    path="/register-for-courses"
                    element={<CoursesRegistrationForm />}
                  />
                )}
                <Route path="/courses/assignment" element={<Assignments />} />
                <Route
                  path="/courses/assignment/view/:id"
                  element={<AssignmentView />}
                />
              </Routes>
            </Grid>
          </Grid>
        )}
      </Router>
    </UserContext.Provider>
  );
};

export default App;
