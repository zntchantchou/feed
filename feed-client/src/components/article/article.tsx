import { FeedArticle } from "../../types/article";
import { useState } from "react";
import { joinClasses } from "utils/style";
import ArticleControls from "./articleControls/articleControls";
import styles from "./article.module.css";

interface ArticleProps {
  article: FeedArticle;
}

function Article({ article }: ArticleProps) {
  let { title } = article;
  if (article.title.length > 130) {
    title = `${title.slice(0, 130)}...`;
  }

  const [isDisplayed, setIsDisplayed] = useState(true);

  const goToUrl = () => window.open(article.url, "_blank");

  if (!isDisplayed) return null!;

  return (
    <div className={joinClasses(styles.article)}>
      <div className={styles.content} onClick={() => goToUrl()}>
        <span className={styles.title}>{title}</span>
        <img
          src={article.urlToImage}
          alt={article.title}
          className={styles.img}
        ></img>
      </div>
      <ArticleControls
        article={article}
        removeFromPage={() => setIsDisplayed(false)}
      ></ArticleControls>
    </div>
  );
}

export default Article;
