import { useEffect, useRef } from "react";
import styles from "./login.module.css";
import { ui, uiConfig } from "auth/firebase-ui";
import auth from "auth/auth";

function Login() {
  const ref = useRef(null);

  useEffect(() => {
    // Make sure root is already present in the dom before mounting
    if (ref.current) ui.start(ref.current, uiConfig);
  }, [ref?.current]);

  return (
    <div id={styles.main}>
      <h1>Login</h1>
      <div>Current user is {auth.currentUser?.email} </div>
      <div id="firebaseui-root" ref={ref}></div>
    </div>
  );
}

export default Login;
