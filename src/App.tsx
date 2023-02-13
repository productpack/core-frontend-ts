import { useState } from "react"
import "./App.css"
import SignUp from "./Pages/Authentication/SignUp/SignUp"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Verification from "./Pages/Authentication/Verification/Verification"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
        <Routes>
          <Route path="/verify" element={<Verification />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
