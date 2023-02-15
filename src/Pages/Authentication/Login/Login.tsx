import React from "react"

import { Avatar, Button, Divider } from "@chakra-ui/react"
import styles from "./Login.module.css"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [status, setStatus] = useState(1)
  const [statusMessage, setStatusMessage] = useState("")
  let navigate = useNavigate()
  const login = () => {
    axios
      .post(`${import.meta.env.VITE_APP_BACKEND_URL}/login`, {
        email: email,
        password: password,
      })
      .then(function (response) {
        localStorage.setItem("access_token", response.data.data.access_token)
        setStatus(response.status)
        setStatusMessage("User Login Successful.")
        return navigate("/user/dashboard")
      })
      .catch(function (error) {
        console.log(error.response)
        setStatus(error.response.status)
        setStatusMessage("Either Invalid User or Wrong Password")
      })
  }
  return (
    <div className={styles.main_container}>
      <div className={styles.first_view_container}>
        <div className={styles.form_container}>
          <div className={styles.fv_texts}>
            <p className={styles.fv_heading}>
              Welcome to <br />
              Product Pack Login
            </p>
            <p className={styles.fv_tagline}>
              Hi There, Enter in your email and password to login to the your
              product pack dashboardd.
            </p>
          </div>
          <div className={styles.fv_input_form}>
            <p className={styles.fv_input_field_label}>Email Address</p>
            <input
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              type="email"
              className={styles.input_field}
            />
            <p className={styles.fv_input_field_label}>Password</p>
            <input
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              type="password"
              className={styles.input_field}
            />
            {status && (status === 200 || status === 400) && (
              <Alert
                marginTop="1rem"
                marginBottom="1rem"
                variant="left-accent"
                width="80%"
                status={status === 400 ? "error" : "success"}
              >
                <AlertIcon />
                <div>
                  <AlertDescription>{statusMessage}</AlertDescription>
                </div>
              </Alert>
            )}
          </div>
          <Button
            onClick={() => {
              if (email && password) {
                login()
              }
            }}
            colorScheme="linkedin"
            size="md"
          >
            Login
          </Button>
          <div className={styles.secondary_options}>
            <Link to="/resetpassword">
              <p className={styles.so_text}>Forgot Password?</p>
            </Link>
            <Link to="/signup">
              <p className={styles.so_text}>Don't have an account?</p>
            </Link>
          </div>
        </div>
        <div className={styles.fv_image_container}>
          <img
            src="/assets/login/fvimg.png"
            alt=""
            className={styles.fv_image}
          />

          <p className={styles.quote}>
            <span>"</span>People ignore design that ignores people.{" "}
            <span>"</span>
          </p>
          <p className={styles.quote_author}>- Frank Chimero</p>
        </div>
      </div>
    </div>
  )
}

export default Login
