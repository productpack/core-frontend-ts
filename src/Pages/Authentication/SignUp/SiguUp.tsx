import { Avatar, Button, Divider } from "@chakra-ui/react"
import styles from "./SignUp.module.css"

const SiguUp = () => {
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
            <input type="email" className={styles.input_field} />
            <p className={styles.fv_input_field_label}>Full Name</p>
            <input type="password" className={styles.input_field} />
          </div>
          <Button colorScheme="linkedin" size="md">
            Login
          </Button>
          <div className={styles.secondary_options}>
            <p className={styles.so_text}>Forgot Password?</p>
            <p className={styles.so_text}>Already have an Account?</p>
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
              I haven't seen anyother community which is having a free dashboard
              for its learners to keep a track of what they are learning and
              constantly upskill them self. Wonderful Product!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SiguUp
4
