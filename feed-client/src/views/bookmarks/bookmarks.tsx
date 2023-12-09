import { useQuery } from "@tanstack/react-query";
import { getBookmarks } from "queries/bookmarks";

export default function Bookmarks() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: () => getBookmarks(),
  });

  if (isError || error) {
    return <div>Error</div>;
  }
  if (isPending) {
    return <div>loading</div>;
  }
  if (data) {
    console.log("data", data);
    return <div>data</div>;
  }
  return <div>Bookmarks</div>;
}
