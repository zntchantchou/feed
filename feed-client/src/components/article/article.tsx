import { Article as ArticleType } from "../../types/article";
import ArticleControls from "./articleControls/articleControls";
import styles from "./article.module.css";

function Article({ article }: { article: ArticleType }) {
  let { title } = article;
  if (article.title.length > 130) {
    title = `${title.slice(0, 130)}...`;
  }

  const goToUrl = () => window.open(article.url, "_blank");
  // console.log("ARTICLE URL TO IMG", article.urlToImage);
  return (
    <div className={styles.article}>
      <div className={styles.content} onClick={() => goToUrl()}>
        <span className={styles.title}>{title}</span>
        <img
          src={article.urlToImage}
          alt={article.title}
          className={styles.img}
        ></img>
      </div>
      <ArticleControls></ArticleControls>
    </div>
  );
}

export default Article;
