import { Avatar, Button, Divider } from "@chakra-ui/react"
import React, { useState } from "react"
import styles from "./Verification.module.css"

import PasswordChecklist from "react-password-checklist"

const Verification = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordAgain, setPasswordAgain] = useState("")

  return (
    <div className={styles.main_container}>
      <div className={styles.first_view_container}>
        <img
          src="/assets/verification/image.png"
          alt=""
          className={styles.fv_image}
        />
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
            <input type="email" className={styles.input_field} />
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
            <div className={styles.password_strength}>
              <PasswordChecklist
                className={styles.password_checklist}
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

export default Verification
