import Authentication from "components/autentication/authentication";
import styles from "./signup.module.css";
import authStyles from "components/autentication/authentication.module.css";
import LoginButton from "components/ui/loginButton/loginButton";
import { joinClasses } from "utils/style";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  return (
    <div className={styles.root}>
      <Authentication title="Sign up">
        <div
          className={joinClasses(authStyles.formGroup, authStyles.credentials)}
          style={{ marginTop: "4rem", height: "17rem" }}
        >
          <input placeholder="email" type="text" />
          <input placeholder="password" type="password" />
          <LoginButton
            onClick={(f) => {
              console.log("[SIGN UP] click ");
            }}
            label="sign up"
            variant="default"
          />
          <LoginButton
            onClick={(f) => {
              navigate("/login");
            }}
            label="go to login"
            variant="dark"
          />
        </div>
      </Authentication>
    </div>
  );
}

export default Signup;
