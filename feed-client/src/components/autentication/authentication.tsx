import { joinClasses } from "utils/style";
import styles from "./authentication.module.css";

function Authentication({
  children,
  title,
}: {
  children: JSX.Element;
  title: string;
}) {
  return (
    <div className={styles.root}>
      <div className={styles.main}>
        <div className={styles.brand}>Feed</div>
        <div className={styles.modal}>
          <div className={styles.title}> {title} </div>
          <div className={styles.content}>{children}</div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
