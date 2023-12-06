import {
  Auth as FirebaseAuth,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth as firebaseAuth } from "auth/config";

class Auth {
  token?: string | null = null;
  refreshToken?: string | null = null;
  uid?: string | null = null;
  email: string | null = null;
  auth: FirebaseAuth = firebaseAuth;

  constructor() {}

  async logIn(mail = "alt.s1-eo4iqzwp@yopmail.com", password = "password") {
    try {
      const res: UserCredential = await signInWithEmailAndPassword(
        this.auth,
        mail,
        password
      );
      this.email = res?.user?.email || null;
      this.uid = res?.user?.uid || null;
      this.refreshToken = res?.user?.refreshToken || null;
      this.token = await res.user.getIdToken();
      return res;
    } catch (e) {
      console.log("[logIn] err: ", e);
    }
  }

  get currentUser() {
    return this.auth.currentUser;
  }

  async isReady() {
    return this.auth.authStateReady();
  }

  getUserInfo() {
    return {
      email: this.email,
      uid: this.uid,
      token: this.token,
      refreshToken: this.refreshToken,
    };
  }

  async createUser(email: string, password: string) {
    try {
      return await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (e) {
      console.log("createUser error: ", e);
    }
  }

  async logOut() {
    console.log("[signOut]");
    try {
      await signOut(this.auth);
    } catch (e) {
      console.log("Auth [logout] ERROR: ", e);
    }
  }

  isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }
}

export default new Auth();
