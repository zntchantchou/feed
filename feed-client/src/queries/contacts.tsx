import { IContact } from "types/contact";
import { GET, getDefaultHeaders, POST } from "./http.utils";

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

export async function getUserContacts() {
  const result = await fetch(process.env.REACT_APP_API_URL + "/contacts", {
    method: GET,
    headers: await getDefaultHeaders(),
  });
  const { contacts }: { contacts: IContact[] } = await result.json();
  return contacts;
}
