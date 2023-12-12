import styles from "./feedLayout.module.css";
import Article from "components/article/article";
import { Article as ArticleType } from "types/article";
import { useQuery } from "@tanstack/react-query";
import { getUpvotes } from "queries/upvotes";
import { useState, useEffect } from "react";
import { getUid } from "utils/articles";

interface FeedProps {
  articles?: ArticleType[];
  isLoading: boolean;
}

type Upvote = {
  articleId: string;
  upvotes: string;
};

export default function FeedLayout({
  articles,
  isLoading,
}: FeedProps): JSX.Element | null {
  const {
    isPending: isUpvotesPending,
    isError: hasUpvotesError,
    data: upvotes,
    error: getUpvotesError,
  } = useQuery({
    queryKey: ["upvotes"],
    queryFn: () => getUpvotes(),
  });

  const [feedArticles, setFeedArticles] = useState(articles);
  const [areUpvotesReady, setAreUpvotesReady] = useState(false);

  useEffect(() => {
    if (!feedArticles) setFeedArticles(articles);
  }, [articles]);

  useEffect(() => {
    if (!areUpvotesReady && feedArticles && upvotes && upvotes.length >= 1) {
      setFeedArticles(addUpvotesToArticles(feedArticles, upvotes));
      setAreUpvotesReady(true);
    }
  }, [upvotes, feedArticles]);

  const addUpvotesToArticles = (
    articles: ArticleType[],
    votes: Upvote[]
  ): ArticleType[] => {
    return articles.map((article: ArticleType) => {
      const upvote = votes.find(
        (upvote: Upvote) => upvote.articleId === getUid(article)
      );
      if (upvote) {
        return { ...article, upvotes: upvote?.upvotes };
      }
      return article;
    });
  };

  if (isLoading || !feedArticles) return <div className={styles.main}></div>;
  const content = feedArticles
    .filter((article: ArticleType) => !!article.urlToImage)
    .map((article: ArticleType) => (
      <Article article={article} key={article.title} />
    ));

  return <div className={styles.main}>{content}</div>;
}
