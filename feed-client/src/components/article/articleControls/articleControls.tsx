import { Article } from "types/article";
import styles from "./articleControls.module.css";
import { createBookMark } from "queries/bookmarks";

interface ArticleControlsProps {
  article: Article;
}

export default function ArticleControls({ article }: ArticleControlsProps) {
  const saveAsBookMark = async () => {
    try {
      console.log("createBookMark article", article);
      await createBookMark(article);
    } catch {
      console.log("bookmarkArticle");
    }
  };

  return (
    <div className={styles.root}>
      <img
        className={styles.img}
        src={"./arrow-up.svg"}
        alt="upvote article"
        color="white"
      ></img>
      <img
        onClick={saveAsBookMark}
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
