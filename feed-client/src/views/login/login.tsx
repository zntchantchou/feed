import { useEffect, useRef, useState } from "react";
import { ui, uiConfig } from "auth/firebase-ui";
import { FirebaseError } from "firebase/app";
import { joinClasses } from "utils/style";
import { useNavigate } from "react-router-dom";
import "./firebase-ui.css";
import styles from "./login.module.css";
import LoginButton from "components/ui/loginButton/loginButton";
import Authentication from "components/autentication/authentication";
import authStyles from "components/autentication/authentication.module.css";
import Auth from "auth/Auth";

interface LoginProps {
  firebaseError?: FirebaseError | null;
}

function Login() {
  const ref = useRef(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<FirebaseError | null>(null);

  useEffect(() => {
    // Make sure root is already present in the dom before mounting
    if (ref.current) ui.start(ref.current, uiConfig);
  }, [ref?.current]);

  const handleSubmit = async () => {
    try {
      setAuthError(null);
      const res = await Auth.logIn(
        emailRef?.current?.value as string,
        passwordRef?.current?.value as string
      );
      navigate("/feed");
    } catch (e) {
      setAuthError(e as FirebaseError);
    }
  };

  return (
    <div className={styles.main}>
      <Authentication title="Log in" errorMessage={authError?.message}>
        <div
          className={joinClasses(authStyles.formGroup, authStyles.credentials)}
        >
          <div id="firebaseui-root" ref={ref}></div>

          <hr className={styles.hr} />

          <div
            className={joinClasses(
              authStyles.formGroup,
              authStyles.credentials,
              styles.form
            )}
          >
            <input placeholder="email" type="text" ref={emailRef} />
            <input placeholder="password" type="password" ref={passwordRef} />
            <LoginButton
              label="log in"
              variant="default"
              onClick={handleSubmit}
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
