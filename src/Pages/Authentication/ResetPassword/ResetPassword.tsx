import ReactPasswordChecklist from "react-password-checklist"
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import styles from "./ResetPassword.module.css"

import { useEffect, useState } from "react"
import { Button } from "@chakra-ui/react"
import axios from "axios"
import { useSearchParams } from "react-router-dom"

import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react"

const ResetPassword = () => {
  const [email, setEmail] = useState("")
  const [secret, setSecret] = useState("")
  const [password, setPassword] = useState("")
  const [passwordAgain, setPasswordAgain] = useState("")
  const [searchParams] = useSearchParams()

  const [status, setStatus] = useState(1)
  const [statusMessage, setStatusMessage] = useState("")

  useEffect(() => {
    setEmail(atob(searchParams.get("email") as string))
    setSecret(searchParams.get("secret") as string)
  }, [])

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
