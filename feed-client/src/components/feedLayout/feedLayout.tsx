import styles from "./feedLayout.module.css";
import { Article as ArticleType } from "types/article";
import Article from "components/article/article";

interface FeedProps {
  articles: ArticleType[];
}

export default function FeedLayout({
  articles,
}: FeedProps): JSX.Element | null {
  const feedContent = articles
    .filter((article: ArticleType) => !!article.urlToImage)
    .map((article: ArticleType) => (
      <Article article={article} key={article.title} />
    ));

  return <div className={styles.main}>{feedContent}</div>;
}
