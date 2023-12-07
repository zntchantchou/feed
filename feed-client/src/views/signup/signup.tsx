import Authentication from "components/autentication/authentication";
import styles from "./signup.module.css";
import authStyles from "components/autentication/authentication.module.css";
import LoginButton from "components/ui/loginButton/loginButton";
import { joinClasses } from "utils/style";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { FirebaseError } from "firebase/app";
import Auth from "auth/Auth";

function Signup() {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [authError, setAuthError] = useState<FirebaseError | null>(null);

  return (
    <div className={styles.root}>
      <Authentication title="Sign up" errorMessage={authError?.message}>
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
            onClick={async (f) => {
              try {
                await Auth.signUp(
                  emailRef?.current?.value as string,
                  passwordRef?.current?.value as string
                );
                return navigate("/feed");
              } catch (e) {
                setAuthError(e as FirebaseError);
              }
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
