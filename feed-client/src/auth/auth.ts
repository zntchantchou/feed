import { initializeApp } from "firebase/app";
import {
  Auth as FirebaseAuth,
  initializeAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  UserCredential,
  createUserWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import firebaseConfig from "auth/config";

class Auth {
  token?: string | null = null;
  refreshToken?: string | null = null;
  uid?: string | null = null;
  email: string | null = null;
  auth: FirebaseAuth;
  instance?: typeof this | null = null;
  storageKey: string = `firebase:authUser:${process.env.REACT_APP_FIREBASE_KEY}:[DEFAULT]`;

  constructor() {
    console.log("[AUTH] constructor");
    const app = initializeApp(firebaseConfig);
    this.auth = initializeAuth(app);
    setPersistence(this.auth, browserSessionPersistence);
    this.listenForAuthChanges();
  }

  getUserFromStorage() {
    sessionStorage.getItem(this.storageKey);
  }

  async logIn(email = "alt.s1-eo4iqzwp@yopmail.com", password = "password") {
    try {
      const res: UserCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      console.log("[Login] MAPPING");
      this.email = res?.user?.email || null;
      this.uid = res?.user?.uid || null;
      this.refreshToken = res?.user?.refreshToken || null;
      this.token = await res.user.getIdToken();
      return res;
    } catch (e) {
      console.log("[logIn] err: ", e);
    }
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
      console.log("Auth [logout]");
    } catch (e) {
      console.log("Auth [logout] ERROR: ", e);
    }
  }

  isLoggedIn(): boolean {
    console.log("CurrentUser ----- \n", this.auth.currentUser);
    return !!this.auth.currentUser;
  }

  listenForAuthChanges() {
    console.log("listenForAuthChanges ...");
    onAuthStateChanged(
      this.auth,
      (event: any) => {
        console.log("onAuthStateChange");
        // use to redirect and reset state on logout
        if (!event) {
          console.log("NO event! ");
        }
      },
      (event: any) => {
        console.log("onAuthStateChanged error");
      }
    );
  }
}

export default Object.freeze(new Auth());
