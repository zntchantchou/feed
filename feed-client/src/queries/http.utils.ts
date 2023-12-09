import Auth from "auth/Auth";

export const getDefaultHeaders = async (): Promise<Headers> => {
  const headers = new Headers();
  const token = await Auth.getToken();
  if (!token) {
    throw new Error("Could not get user's token");
  }
  headers.append("Content-Type", "application/json");
  headers.append("token", token);
  return headers;
};

export const POST = "POST";
export const GET = "GET";
export const PUT = "PUT";
export const DELETE = "DELETE";
