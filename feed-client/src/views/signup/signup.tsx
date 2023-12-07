import Authentication from "components/autentication/authentication";
import styles from "./signup.module.css";
import authStyles from "components/autentication/authentication.module.css";
import LoginButton from "components/ui/loginButton/loginButton";
import { joinClasses } from "utils/style";

function Signup() {
  return (
    <div className={styles.root}>
      <Authentication title="Sign up">
        <div
          className={joinClasses(authStyles.formGroup, authStyles.credentials)}
          style={{ marginTop: "4rem" }}
        >
          <input placeholder="email" type="text" />
          <input placeholder="password" type="password" />
          <LoginButton label="sign up" variant="dark" />
        </div>
      </Authentication>
    </div>
  );
}

export default Signup;
