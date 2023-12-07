import {
  Auth as FirebaseAuth,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth as firebaseAuth } from "auth/config";

class Auth {
  auth: FirebaseAuth = firebaseAuth;

  async logIn(mail: string, password: string) {
    const res: UserCredential = await signInWithEmailAndPassword(
      this.auth,
      mail,
      password
    );
    return res;
  }

  async logOut() {
    try {
      console.log("[Authservice] Logout");
      await signOut(this.auth);
    } catch (e) {
      console.log("[Authservice] Logout ERROR: \n ", e);
    }
  }

  async isReady() {
    return this.auth.authStateReady();
  }

  async signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  async getToken() {
    return this.auth?.currentUser?.getIdToken();
  }

  // Getters

  get currentUser() {
    return this.auth?.currentUser;
  }

  get uid() {
    return this.auth?.currentUser?.uid;
  }

  get refreshToken() {
    return this.auth?.currentUser?.refreshToken;
  }

  get email() {
    return this.auth?.currentUser?.email;
  }
}

export default new Auth();
