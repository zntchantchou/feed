import styles from "./articleControls.module.css";

export default function ArticleControls() {
  return (
    <div className={styles.root}>
      <img
        className={styles.img}
        src={"./arrow-up.svg"}
        alt="upvote article"
        color="white"
      ></img>
      <img
        className={styles.img}
        src={"./folder.svg"}
        alt="bookmark article"
        color="white"
      ></img>
      <img
        className={styles.img}
        src={"./bell.svg"}
        alt="recommend article"
        color="white"
      ></img>
    </div>
  );
}
