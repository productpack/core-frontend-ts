import React from "react"

import { Avatar, Button, Divider, useDisclosure } from "@chakra-ui/react"
import styles from "./Login.module.css"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react"

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [status, setStatus] = useState(1)
  const [statusMessage, setStatusMessage] = useState("")
  let navigate = useNavigate()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const login = () => {
    localStorage.clear()
    axios
      .post(`${import.meta.env.VITE_APP_BACKEND_URL}/login`, {
        email: email,
        password: password,
      })
      .then(function (response) {
        localStorage.setItem("access_token", response.data.data.access_token)
        localStorage.setItem("is_admin", response.data.data.is_admin)

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

  const initResend = () => {
    axios
      .post(`${import.meta.env.VITE_APP_BACKEND_URL}/init_reset_pass`, {
        email: email,
      })
      .then(function (response) {
        setStatus(response.status)
        setStatusMessage("Reset Key Successfully Sent!")
      })
      .catch(function (error) {
        console.log(error)
        setStatus(error.response.status)
        setStatusMessage("You have Entered an Invalid Email Address")
      })
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose()
          setStatus(1)
        }}
      >
        <ModalOverlay />
        <ModalContent margin="1rem">
          <ModalHeader>Sent Reset Password Key</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            The password reset key will be mailed to your registered email
            address. Kindly enter the same in the below given input filed.
            <p className={styles.fv_input_field_label}>Email Address</p>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              type="email"
              className={styles.input_field}
            />
            {isOpen && status && (status === 200 || status === 400) && (
              <Alert
                marginTop="1rem"
                marginBottom="1rem"
                variant="left-accent"
                width="100%"
                status={status === 400 ? "error" : "success"}
              >
                <AlertIcon />
                <div>
                  <AlertDescription>{statusMessage}</AlertDescription>
                </div>
              </Alert>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                initResend()
              }}
            >
              Sent Reset Link
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
                product pack dashboard.
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
              {!isOpen && status && (status === 200 || status === 400) && (
                <Alert
                  marginTop="1rem"
                  marginBottom="1rem"
                  variant="left-accent"
                  width="100%"
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
              <p
                onClick={() => {
                  setStatus(1)
                  onOpen()
                }}
                className={styles.so_text}
              >
                Forgot Password?
              </p>

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

            <div className={styles.quote_text}>
              <p className={styles.quote}>
                <span>"</span>People ignore design that ignores people.{" "}
                <span>"</span>
              </p>
              <br />
              <p className={styles.quote_author}>- Frank Chimero</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
