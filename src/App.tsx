import { useState } from "react"
import "./App.css"
import SignUp from "./Pages/Authentication/SignUp/SignUp"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Verification from "./Pages/Authentication/Verification/Verification"
import Login from "./Pages/Authentication/Login/Login"
import ResetPassword from "./Pages/Authentication/ResetPassword/ResetPassword"
import UserDashboard from "./Pages/Dashboard/UserDashboard/UserDashboard"
import CreateEvent from "./Pages/Dashboard/AdminDashboard/CreateEvent/CreateEvent"
import AwardPoints from "./Pages/Dashboard/AdminDashboard/AwardPoints/AwardPoints"
import ManageUsers from "./Pages/Dashboard/AdminDashboard/ManageUsers/ManageUsers"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />}></Route>

          <Route path="/login" element={<Login />}></Route>

          <Route path="/verify" element={<Verification />}></Route>

          <Route path="/resetpassword" element={<ResetPassword />}></Route>

          <Route path="/user/dashboard" element={<UserDashboard />}></Route>

          <Route path="/admin/createevents" element={<CreateEvent />}></Route>

          <Route path="/admin/awardpoints" element={<AwardPoints />}></Route>

          <Route path="/admin/manageusers" element={<ManageUsers />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
