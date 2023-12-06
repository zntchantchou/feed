import { auth } from "firebaseui";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  EmailAuthProvider,
} from "@firebase/auth";
import AuthService from "./auth";

export const ui = new auth.AuthUI(AuthService.auth);
export const uiConfig = {
  signInOptions: [
    {
      provider: GoogleAuthProvider.PROVIDER_ID,
      signInMethod: GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD,
      requireDisplayName: false,
    },
    // {
    //   provider: GithubAuthProvider.PROVIDER_ID,
    //   signInMethod: GithubAuthProvider.GITHUB_SIGN_IN_METHOD,
    // },
    // {
    //   provider: EmailAuthProvider.PROVIDER_ID,
    //   signInMethod: EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
    //   requireDisplayName: false,
    // },
  ],
  signInFlow: "popup",
  signInSuccessUrl: "http://localhost:3000/feed",
};
