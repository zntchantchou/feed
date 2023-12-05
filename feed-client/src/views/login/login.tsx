import styles from "./login.module.css";
import { ui, uiConfig } from "auth/firebase-ui";

function Login() {
  const rootId = "#firebaseui-auth-container";
  ui.start(rootId, uiConfig);
  <h1>Login page</h1>;
  return (
    <div id={rootId} className={styles.root}>
      Login Page
    </div>
  );
}

export default Login;
