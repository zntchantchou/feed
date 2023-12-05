import { useContext, useEffect, useRef } from "react";
import styles from "./login.module.css";
import { ui, uiConfig } from "auth/firebase-ui";
import { AuthContext } from "App";

function Login() {
  const ref = useRef(null);
  const user = useContext(AuthContext);

  useEffect(() => {
    // Make sure root is already present in the dom before mounting
    if (ref.current) ui.start(ref.current, uiConfig);
  }, [ref?.current]);

  return (
    <div id={styles.main}>
      <h1>Login</h1>
      <div>Current user is {user?.email} </div>
      <div id="firebaseui-root" ref={ref}></div>
    </div>
  );
}

export default Login;
