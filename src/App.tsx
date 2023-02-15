import { useState } from "react"
import "./App.css"
import SignUp from "./Pages/Authentication/SignUp/SignUp"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Verification from "./Pages/Authentication/Verification/Verification"
import Login from "./Pages/Authentication/Login/Login"
import ResetPassword from "./Pages/Authentication/ResetPassword/ResetPassword"
import UserDashboard from "./Pages/Dashboard/UserDashboard/UserDashboard"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
        <Routes>
          <Route path="/verify" element={<Verification />}></Route>
        </Routes>
        <Routes>
          <Route path="/resetpassword" element={<ResetPassword />}></Route>
        </Routes>
        <Routes>
          <Route path="/user/dashboard" element={<UserDashboard />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
