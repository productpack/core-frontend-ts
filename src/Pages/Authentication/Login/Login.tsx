import { Avatar, Button, Divider } from "@chakra-ui/react"
import styles from "./Login.module.css"

const Login = () => {
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
            <p className={styles.fv_input_field_label}>Password</p>
            <input type="password" className={styles.input_field} />
          </div>
          <Button colorScheme="linkedin" size="md">
            Login
          </Button>
          <div className={styles.secondary_options}>
            <p className={styles.so_text}>Forgot Password?</p>
            <p className={styles.so_text}>Don't have an account?</p>
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
