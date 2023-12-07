import { FirebaseError } from "firebase/app";
import styles from "./authentication.module.css";

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
