import { Article } from "types/article";
import {
  DELETE,
  GET,
  POST,
  formatArticle,
  getDefaultHeaders,
} from "./http.utils";

export async function getUpvotes() {
  const res = await fetch(process.env.REACT_APP_API_URL + "/upvotes", {
    method: GET,
    headers: await getDefaultHeaders(),
  });
  return res.json();
}

export async function upVoteArticle(article: Article) {
  console.log("[queries] createUpvote", article);
  const upvote = await fetch(process.env.REACT_APP_API_URL + "/upvotes", {
    method: POST,
    headers: await getDefaultHeaders(),
    body: JSON.stringify(formatArticle(article)),
  });
  return upvote.json();
}

export async function deleteUpvote(article: Article) {
  console.log("[queries] deleteUpvote", article);
  const upvote = await fetch(process.env.REACT_APP_API_URL + "/upvotes", {
    method: DELETE,
    headers: await getDefaultHeaders(),
    body: JSON.stringify(formatArticle(article)),
  });
  return upvote.json();
}
