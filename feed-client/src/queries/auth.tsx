import Auth from "auth/Auth";

const API_URL = process.env.REACT_APP_API_URL;

export const checkAuthWithServer = async () => {
  const token = await Auth.getToken();
  if (!token) {
    console.log("checkAuthWithServer token ", token);
    return null;
  }

  const response = await fetch(API_URL + "/bookmarks", {
    method: "GET",
    mode: "cors",
    headers: {
      token,
    },
  });

  return response;
};
