import { Article } from "types/article";
import { getDefaultHeaders, POST, GET, DELETE } from "./http.utils";

export async function createBookMark(article: Article) {
  console.log("createBookMark", article);
  const bookmark = await fetch(process.env.REACT_APP_API_URL + "/bookmarks", {
    method: POST,
    headers: await getDefaultHeaders(),
    body: JSON.stringify({ ...article, source: article.source?.name }),
  });
  return bookmark.json();
}

export async function getBookmarks() {
  const bookmarks = await fetch(process.env.REACT_APP_API_URL + "/bookmarks", {
    method: GET,
    headers: await getDefaultHeaders(),
  });
  return bookmarks.json();
}

export async function deleteBookmark(article: Article) {
  console.log("deleteBookmark ", article);
  const bookmarks = await fetch(process.env.REACT_APP_API_URL + "/bookmarks", {
    method: DELETE,
    headers: await getDefaultHeaders(),
    body: JSON.stringify(article),
  });
  return bookmarks.json();
}
