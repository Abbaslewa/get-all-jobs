import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./component/Register";
import Home from "./page/Home";
import Login from "./component/Login"; // Add this import for the Login component
import Salary from "./page/Salary";
import Apply from "./page/Apply";
import CreateJob from "./page/Createjob";
import MyJob from "./page/myJob";
import EditJob from "./component/Edit";
import MyApply from "./page/myApply"; // Corrected path for EditJob
import ProfilePage from "./component/ProfilePage";
// import LocationList from "./page/apply";
// import Button from "./component/Button";
// import Input from "./component/Input";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page route */}
        <Route path="/register" element={<Register />} /> {/* Register page route */}
        <Route path="/login" element={<Login />} />
        <Route path="/salary" element={<Salary />} />
        <Route path="/apply/:jobId" element={<Apply />} />
        <Route path="/create-job" element={<CreateJob />} />
        <Route path="/my-jobs" element={<MyJob />} />
        <Route path="/edit-job/:jobId" element={<EditJob />} /> 
        <Route path="/myapply" element={<MyApply />} />
        <Route path="/profile" element={<ProfilePage />} /> {/* Updated EditJob route */}
        {/* <Route path="/location" element={<LocationList/>} /> */}
        {/* <Route path="/button" element={<Button />} />  */}
        {/* <Route path="/input" element={<Input/>} /> */}
      </Routes>
    </Router>
  );
};

export default App;
