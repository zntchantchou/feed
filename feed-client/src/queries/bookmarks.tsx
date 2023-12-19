import { NewsApiArticle } from "types/article";
import {
  getDefaultHeaders,
  POST,
  GET,
  DELETE,
  formatArticle,
} from "./http.utils";

export async function getBookmarks() {
  const bookmarks = await fetch(process.env.REACT_APP_API_URL + "/bookmarks", {
    method: GET,
    headers: await getDefaultHeaders(),
  });
  console.log("bookmarks ", bookmarks);
  return bookmarks.json();
}

export async function createBookMark(article: NewsApiArticle) {
  console.log("createBookMark", article);
  const bookmark = await fetch(process.env.REACT_APP_API_URL + "/bookmarks", {
    method: POST,
    headers: await getDefaultHeaders(),
    body: JSON.stringify(formatArticle(article)),
  });
  return bookmark.json();
}

export async function deleteBookmark(article: NewsApiArticle) {
  const bookmarks = await fetch(process.env.REACT_APP_API_URL + "/bookmarks", {
    method: DELETE,
    headers: await getDefaultHeaders(),
    body: JSON.stringify(formatArticle(article)),
  });
  return bookmarks.json();
}
