import { Button } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import styles from "./Verification.module.css"

import PasswordChecklist from "react-password-checklist"
import axios from "axios"
import { useSearchParams } from "react-router-dom"

import {
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react"

const Verification = () => {
  const [email, setEmail] = useState("")
  const [secret, setSecret] = useState("")
  const [password, setPassword] = useState("")
  const [passwordAgain, setPasswordAgain] = useState("")
  const [isvalid, setIsValid] = useState(false)
  const [searchParams] = useSearchParams()

  const [status, setStatus] = useState(1)
  const [statusMessage, setStatusMessage] = useState("")

  useEffect(() => {
    setEmail(atob(searchParams.get("email") as string))
    setSecret(searchParams.get("secret") as string)
  }, [])

  const set_pass = () => {
    axios
      .post(`${import.meta.env.VITE_APP_BACKEND_URL}/set_pass`, {
        email: email,
        secret: secret,
        password: passwordAgain,
      })
      .then(function (response) {
        setStatus(response.status)
        setStatusMessage("SignUp Is Successfully Completed.")
      })
      .catch(function (error) {
        setStatus(error.response.status)
        if (isvalid) {
          setStatusMessage("User Already Verified, Please Login!")
        } else {
          setStatusMessage("Password Doesn't Meet Security Requirements!")
        }
      })
  }

  return (
    <div className={styles.main_container}>
      <div className={styles.first_view_container}>
        <div className={styles.password_strength}>
          <img
            src="/assets/verification/image.png"
            alt=""
            className={styles.fv_image}
          />
          <PasswordChecklist
            className={styles.password_checklist}
            validColor="#2f8cc9"
            invalidColor="#404040"
            rules={["minLength", "specialChar", "number", "capital", "match"]}
            minLength={8}
            value={password}
            valueAgain={passwordAgain}
            onChange={(isValid) => {
              setIsValid(isValid)
            }}
          />
        </div>
        <div className={styles.form_container}>
          <div className={styles.fv_texts}>
            <p className={styles.fv_heading}>
              Kindly, Complete the verification and Set Password to signup.
            </p>
            <p className={styles.fv_tagline}>
              Hi There, Enter in your username and password to complete the
              signup process and to login to your product pack dashboard.
            </p>
          </div>
          <div className={styles.fv_input_form}>
            <p className={styles.fv_input_field_label}>Email Address</p>
            <input
              disabled
              value={email}
              type="email"
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
          </div>
          {status && (status === 200 || status === 400) && (
            <Alert
              marginTop="2rem"
              marginBottom="2rem"
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

          <Button
            onClick={() => {
              set_pass()
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

export default Verification
