import { getDefaultHeaders, POST } from "./http.utils";

export async function searchContactByEmail(text: string) {
  const bookmarks = await fetch(
    process.env.REACT_APP_API_URL + "/contacts/search",
    {
      method: POST,
      headers: await getDefaultHeaders(),
      body: JSON.stringify({ email: text }),
    }
  );
  return bookmarks.json();
}
