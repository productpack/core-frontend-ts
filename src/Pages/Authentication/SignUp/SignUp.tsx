import { Avatar, Button, Divider, useDisclosure } from "@chakra-ui/react"
import axios from "axios"
import styles from "./SignUp.module.css"
import { useState } from "react"

import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const SignUp = () => {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")

  const [status, setStatus] = useState(1)
  const [statusMessage, setStatusMessage] = useState("")

  const init = () => {
    setStatus(1)
    setStatusMessage("")
    axios
      .post(`${import.meta.env.VITE_APP_BACKEND_URL}/init`, {
        name: name,
        email: email,
      })
      .then(function (response) {
        setStatus(response.status)
        setStatusMessage("SignUp Procedure Started! Checkout your Email.")
      })
      .catch(function (error) {
        setStatus(error.response.status)
        setStatusMessage(
          "User Already Registered. Kindly, Checkout your Email."
        )
      })
  }

  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.form_container}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>
                Hey There, Enter in your Email Address and Full Name.
              </p>
              <p className={styles.fv_tagline}>
                Once you click the submit button, make sure to check your mail
                id for the furthur signup process.
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
              <p className={styles.fv_input_field_label}>Full Name</p>
              <input
                onChange={(e) => {
                  setName(e.target.value)
                }}
                type="text"
                className={styles.input_field}
              />
              {status && (status === 200 || status === 400) && (
                <Alert
                  marginTop="2rem"
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
                if (email && name) {
                  init()
                }
              }}
              colorScheme="linkedin"
              size="md"
            >
              SignUp
            </Button>
            <div className={styles.secondary_options}>
              <Link to="/login">
                <p className={styles.so_text}>Already have an Account?</p>
              </Link>
            </div>
          </div>
          <div className={styles.testimonials_container}>
            <div className={styles.testimonial}>
              <div className={styles.speaker_details}>
                <Avatar
                  size="xl"
                  name=""
                  src="https://static.wixstatic.com/media/52757a_ac19c7ad61384e199a40b3623389c95b~mv2.png/v1/fill/w_115,h_119,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/52757a_ac19c7ad61384e199a40b3623389c95b~mv2.png"
                />
                <Divider orientation="vertical" />
                <p className={styles.name}>
                  Gopi Shankar S <br />
                  Intern at TinkerHub
                </p>
              </div>
              <p className={styles.testimonial_content}>
                I haven't seen anyother community which is having a free
                dashboard for its learners to keep a track of what they are
                learning and constantly upskill them self. Wonderful Product!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
