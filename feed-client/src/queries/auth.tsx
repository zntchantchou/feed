const API_URL = process.env.REACT_APP_API_URL;

export const checkAuthWithServer = async (token: string) => {
  return fetch(API_URL + "/check", {
    method: "GET",
    mode: "cors",
    headers: {
      "firebase-token": token,
    },
  });
};
