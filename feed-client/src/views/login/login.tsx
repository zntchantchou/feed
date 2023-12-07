import "./firebase-ui.css";
import styles from "./login.module.css";
import { useEffect, useRef } from "react";
import { ui, uiConfig } from "auth/firebase-ui";
import LoginButton from "components/ui/loginButton/loginButton";
import { joinClasses } from "utils/style";
import Authentication from "components/autentication/authentication";
import authStyles from "components/autentication/authentication.module.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Make sure root is already present in the dom before mounting
    if (ref.current) ui.start(ref.current, uiConfig);
  }, [ref?.current]);

  return (
    <div className={styles.main}>
      <Authentication title="Log in">
        <div
          // style={{ height: "em" }}
          className={joinClasses(authStyles.formGroup, authStyles.credentials)}
        >
          <div id="firebaseui-root" ref={ref}></div>

          <hr />

          <div
            className={joinClasses(
              authStyles.formGroup,
              authStyles.credentials,
              styles.form
            )}
          >
            <input placeholder="email" type="text" />
            <input placeholder="password" type="password" />
            <LoginButton
              label="log in"
              variant="default"
              onClick={(f) => {
                console.log("f ", f);
              }}
            />
            <LoginButton
              label="sign up"
              variant="dark"
              onClick={() => {
                console.log("signup");
                navigate("/signup");
              }}
            />
          </div>
        </div>
      </Authentication>
    </div>
  );
}

export default Login;
