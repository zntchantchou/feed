import styles from "./authentication.module.css";
import Auth from "auth/Auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthenticationProps {
  children: JSX.Element;
  title: string;
  errorMessage?: string | null;
}

function Authentication({
  children,
  title,
  errorMessage,
}: AuthenticationProps) {
  const navigate = useNavigate();

  // redirect to feed if user is already logged in
  useEffect(() => {
    Auth.waitForStart().then(() => {
      if (Auth.currentUser) navigate("/feed");
    });
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.main}>
        <div className={styles.brand}>Feed</div>
        <div className={styles.modal}>
          <div className={styles.title}> {title} </div>
          <div className={styles.content}>{children}</div>
          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
