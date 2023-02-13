import ReactPasswordChecklist from "react-password-checklist"
import styles from "./ResetPassword.module.css"

import { useState } from "react"
import { Button } from "@chakra-ui/react"

const ResetPassword = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordAgain, setPasswordAgain] = useState("")
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
              resetting the password.
            </p>
          </div>
          <div>
            <p className={styles.fv_input_field_label}>Email Address</p>
            <input type="email" className={styles.input_field} />

            <Button marginTop={"1rem"} colorScheme="linkedin" size="md">
              Sent Reset Key
            </Button>
          </div>
        </div>
        <div className={styles.form_container}>
          <div className={styles.fv_texts}>
            <p className={styles.fv_heading}>Reset Your Account Password</p>
            <p className={styles.fv_tagline}>
              Hi There, Enter in your email and password to login to the your
              product pack dashboard.
            </p>
          </div>
          <div className={styles.fv_input_form}>
            <p className={styles.fv_input_field_label}>Enter Secret Key</p>
            <input type="text" className={styles.input_field} />
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
          </div>
          <Button colorScheme="linkedin" size="md">
            Set Password
          </Button>
          <div className={styles.secondary_options}>
            <p className={styles.so_text}>Forgot Password?</p>
            <p className={styles.so_text}>Already have an Account?</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
