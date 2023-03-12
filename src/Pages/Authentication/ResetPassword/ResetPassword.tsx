import ReactPasswordChecklist from "react-password-checklist"
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import styles from "./ResetPassword.module.css"

import { useEffect, useState } from "react"
import { Button, Tooltip } from "@chakra-ui/react"
import axios from "axios"
import { useSearchParams } from "react-router-dom"

import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

const ResetPassword = () => {
  //State Variables for Reset Password Form
  const [email, setEmail] = useState("")
  const [secret, setSecret] = useState("")
  const [password, setPassword] = useState("")
  const [passwordVisible, setPasswordVisible] = useState(false)

  const [passwordAgain, setPasswordAgain] = useState("")
  const [passwordAgainVisible, setPasswordAgainVisible] = useState(false)

  //For Password Strength Check(Validation)
  const [isvalid, setIsValid] = useState(false)

  //Get URL Params(Email and Secret)
  const [searchParams] = useSearchParams()

  //Alert State Variables
  const [status, setStatus] = useState(1)
  const [statusMessage, setStatusMessage] = useState(
    "Make Sure you have filled in the fields."
  )

  //Get Email and Secret from URL Params(Decoding)
  useEffect(() => {
    setEmail(atob(searchParams.get("email") as string))
    setSecret(searchParams.get("secret") as string)
  }, [])

  //POST Request for Reset Password
  const resetPass = () => {
    axios
      .post(`${import.meta.env.VITE_APP_BACKEND_URL}/reset_pass`, {
        email: email,
        secret: secret,
        new_password: passwordAgain,
      })
      .then(function (response) {
        setStatus(response.status)
        console.log(response)
        setStatusMessage("Password Resetted, You will be redirected to Login.")
        setTimeout(() => {
          window.location.href = "/login"
        }, 5000)
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
            <p className={styles.fv_heading}>
              Reset Your Product Pack Password
            </p>
            <p className={styles.fv_tagline}>
              Enter the new password for your account, and you can login to your
              account. Make sure you don't forget it again.
            </p>
          </div>
          <div className={styles.fv_input_form}>
            <p className={styles.fv_input_field_label}>Password</p>

            <div className={styles.password_input_wrapper}>
              <input
                type={passwordVisible ? "text" : "password"}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (status === 400) {
                    setStatus(1)
                    setStatusMessage("")
                  }
                }}
                className={styles.input_field}
              />
              <FontAwesomeIcon
                icon={passwordVisible ? faEyeSlash : faEye}
                onClick={() => setPasswordVisible(!passwordVisible)}
                className={styles.password_visibility_toggle}
              />
            </div>

            <p className={styles.fv_input_field_label}>Confirm Password</p>

            <div className={styles.password_input_wrapper}>
              <input
                type={passwordAgainVisible ? "text" : "password"}
                onChange={(e) => setPasswordAgain(e.target.value)}
                className={styles.input_field}
              />
              <FontAwesomeIcon
                icon={passwordAgainVisible ? faEyeSlash : faEye}
                onClick={() => setPasswordAgainVisible(!passwordAgainVisible)}
                className={styles.password_visibility_toggle}
              />
            </div>

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
                onChange={(isValid) => {
                  setIsValid(isValid)
                }}
              />
            </div>
            {secret && status && (status === 200 || status === 400) && (
              <Alert
                marginTop="1rem"
                marginBottom="1rem"
                variant="left-accent"
                status={status === 400 ? "error" : "success"}
              >
                <AlertIcon />
                <div>
                  <AlertDescription>{statusMessage}</AlertDescription>
                </div>
              </Alert>
            )}
          </div>
          <Tooltip label={statusMessage}>
            <Button
              onClick={() => {
                if (isvalid) {
                  resetPass()
                } else {
                  setStatus(400)
                  setStatusMessage(
                    "Password Doesn't Meet Security Requirements!"
                  )
                }
              }}
              disabled={!isvalid}
              colorScheme="linkedin"
              size="md"
            >
              Set Password
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
