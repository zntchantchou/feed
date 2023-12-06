import "./firebase-ui.css";
import styles from "./login.module.css";
import { useEffect, useRef } from "react";
import { ui, uiConfig } from "auth/firebase-ui";
import LoginButton from "components/ui/loginButton/loginButton";
import { joinClasses } from "utils/style";

function Login() {
  const ref = useRef(null);

  useEffect(() => {
    // Make sure root is already present in the dom before mounting
    if (ref.current) ui.start(ref.current, uiConfig);
  }, [ref?.current]);

  return (
    <div className={styles.main}>
      <div className={styles.modal}>
        <div className={styles.title}> Login </div>

        <div id="firebaseui-root" ref={ref}></div>

        <hr />

        <div className={joinClasses(styles.formGroup, styles.credentials)}>
          <input placeholder="email" type="text" />
          <input placeholder="password" type="password" />
          {/* <div className={joinClasses(styles.formGroup, styles.controls)}> */}
          <LoginButton label="log in" variant="default" />
          <LoginButton label="sign up" variant="dark" />
        </div>
        {/* </div> */}
        <div> </div>
      </div>
    </div>
  );
}

export default Login;
