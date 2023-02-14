import ReactPasswordChecklist from "react-password-checklist"
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import styles from "./ResetPassword.module.css"

import { useState } from "react"
import { Button } from "@chakra-ui/react"
import axios from "axios"

import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react"

const ResetPassword = () => {
  const [email, setEmail] = useState("")
  const [secret, setSecret] = useState("")
  const [password, setPassword] = useState("")
  const [passwordAgain, setPasswordAgain] = useState("")

  const [status, setStatus] = useState(1)
  const [statusMessage, setStatusMessage] = useState("")

  const [resent, setResent] = useState(false)
  const [timer, setTimer] = useState(false)

  const initResetPass = () => {
    axios
      .post(`${import.meta.env.VITE_APP_BACKEND_URL}/init_reset_pass`, {
        email: email,
      })
      .then(function (response) {
        setStatus(response.status)
        setStatusMessage("Reset Key Successfully Sent!")

        setTimer(true)
      })
      .catch(function (error) {
        setStatus(error.response.status)
        setStatusMessage("You have Entered an Invalid Email Address")
      })
  }

  const initResend = () => {
    axios
      .post(`${import.meta.env.VITE_APP_BACKEND_URL}/init_resend`, {
        email: email,
      })
      .then(function (response) {
        setStatus(response.status)
        setStatusMessage("Reset Key Successfully Sent Again!")

        setTimer(true)
      })
      .catch(function (error) {
        console.log(error)
        setStatus(error.response.status)
        setStatusMessage("You have Entered an Invalid Email Address")
      })
  }

  const resetPass = () => {
    axios
      .post(`${import.meta.env.VITE_APP_BACKEND_URL}/reset_pass`, {
        email: email,
        secret: secret,
        new_password: passwordAgain,
      })
      .then(function (response) {
        setStatus(response.status)
        setStatusMessage("Password Reset Is Successful!")
      })
      .catch(function (error) {
        setStatus(error.response.status)
        setStatusMessage(
          "Password Reset Failed, Make Sure you Entered Correct Token!"
        )
      })
  }

  return (
    <div className={styles.main_container}>
      <div className={styles.first_view_container}>
        <div className={styles.password_strength}>
          <img
            src="/assets/resetpassword/fvimg.png"
            alt=""
            className={styles.fv_image}
          />
          <div className={styles.fv_texts}>
            <p className={styles.fv_heading}>Sent Password Reset Key</p>
            <p className={styles.fv_tagline}>
              Enter in your email address to receive the secret key for
              resetting your account password.
            </p>
          </div>
          <div>
            <p className={styles.fv_input_field_label}>Email Address</p>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              type="email"
              className={styles.input_field}
            />

            {secret.length === 0 &&
              status &&
              (status === 200 || status === 400) && (
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
            {!resent && !timer && (
              <Button
                onClick={() => {
                  initResetPass()
                }}
                marginTop={"1rem"}
                colorScheme="linkedin"
                size="md"
              >
                Sent Reset Key
              </Button>
            )}
            {resent && !timer && (
              <Button
                onClick={() => {
                  initResend()
                }}
                marginTop={"1rem"}
                colorScheme="linkedin"
                size="md"
              >
                Resent Secret Key
              </Button>
            )}
            {timer && (
              <div className={styles.timer}>
                <CountdownCircleTimer
                  strokeWidth={6}
                  size={50}
                  isPlaying
                  duration={10}
                  colors={"#2f8cc9"}
                  onComplete={() => {
                    setResent(true)
                    setTimer(false)
                    setStatus(1)
                  }}
                >
                  {({ remainingTime }) => remainingTime}
                </CountdownCircleTimer>
                <span>Seconds Left</span>
              </div>
            )}
          </div>
        </div>
        <div className={styles.form_container}>
          <div className={styles.fv_texts}>
            <p className={styles.fv_heading}>Reset Your Account Password</p>
            <p className={styles.fv_tagline}>
              Enter in the secret key your received from the email we just sent
              you.
            </p>
          </div>
          <div className={styles.fv_input_form}>
            <p className={styles.fv_input_field_label}>Enter Secret Key</p>
            <input
              onChange={(e) => setSecret(e.target.value)}
              type="text"
              className={styles.input_field}
            />
            <p className={styles.fv_input_field_label}>Password</p>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input_field}
            />
            <p className={styles.fv_input_field_label}>Confirm Password</p>
            <input
              type="password"
              onChange={(e) => setPasswordAgain(e.target.value)}
              className={styles.input_field}
            />

            <div className={styles.password_checklist}>
              <ReactPasswordChecklist
                validColor="#2f8cc9"
                invalidColor="#404040"
                rules={[
                  "minLength",
                  "specialChar",
                  "number",
                  "capital",
                  "match",
                ]}
                minLength={8}
                value={password}
                valueAgain={passwordAgain}
              />
            </div>
            {secret && status && (status === 200 || status === 400) && (
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
              resetPass()
            }}
            colorScheme="linkedin"
            size="md"
          >
            Set Password
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
