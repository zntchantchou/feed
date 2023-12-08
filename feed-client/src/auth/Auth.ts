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

  async signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  /**
   * @returns returns a promise that resolves immediately when the initial auth state is settled. When the promise resolves, the current user might be a valid user or null if the user signed out.
   */
  async waitForStart(): Promise<void> {
    return this.auth.authStateReady();
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
