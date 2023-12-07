import { auth } from "firebaseui";
import { GoogleAuthProvider } from "@firebase/auth";
import AuthService from "./Auth";

export const ui = new auth.AuthUI(AuthService.auth);
export const uiConfig = {
  signInOptions: [
    {
      provider: GoogleAuthProvider.PROVIDER_ID,
      signInMethod: GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD,
      requireDisplayName: false,
    },
  ],
  signInFlow: "popup",
  signInSuccessUrl: "http://localhost:3000/feed",
};
