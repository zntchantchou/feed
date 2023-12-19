import { useQuery } from "@tanstack/react-query";
import { getBookmarks } from "queries/bookmarks";
import { FeedArticle } from "types/article";
import FeedLayout from "components/layouts/feedLayout/feedLayout";

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

  if (isPending || !articles) {
    return <FeedLayout isLoading={true} />;
  }

  const bookmarkedArticles: FeedArticle[] = articles.map(
    (article: FeedArticle): FeedArticle => ({
      ...article,
      isBookmarked: true,
    })
  );
  return <FeedLayout articles={bookmarkedArticles} isLoading={isPending} />;
}
