import { useQuery } from "@tanstack/react-query";
import FeedLayout from "components/feedLayout/feedLayout";
import { getBookmarks } from "queries/bookmarks";

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
    return <div>Error</div>;
  }
  if (isPending) {
    return <div>loading</div>;
  }
  if (articles) {
    console.log("Bookmarks ", articles);
    return <FeedLayout articles={articles} />;
  }
  return <div>Bookmarks</div>;
}
