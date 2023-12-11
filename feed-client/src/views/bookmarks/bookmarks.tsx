import { useQuery } from "@tanstack/react-query";
import FeedLayout from "components/feedLayout/feedLayout";
import { getBookmarks } from "queries/bookmarks";
import { Article } from "types/article";

export default function Bookmarks() {
  const {
    isPending,
    isError,
    data: articles,
    error,
  } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: () => getBookmarks(),
  });

  if (isError || error) {
    console.log("IS ERROR", isError, "\n", error);
    return <div>Error</div>;
  }
  if (isPending) {
    return <div>loading</div>;
  }
  if (articles) {
    const bookmarkedArticles: Article[] = articles.map(
      (article: Article): Article => ({
        ...article,
        isBookmarked: true,
      })
    );
    return <FeedLayout articles={bookmarkedArticles} />;
  }
  return <div>Bookmarks</div>;
}
