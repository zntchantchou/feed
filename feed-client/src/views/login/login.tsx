import { useEffect, useRef } from "react";
import styles from "./login.module.css";
import { ui, uiConfig } from "auth/firebase-ui";
import "./firebase-ui.css";

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
        <div> Signup with email and password</div>
      </div>
    </div>
  );
}

export default Login;
// alt.va-50qp95q@yopmail.com
