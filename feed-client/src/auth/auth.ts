import {
  Auth as FirebaseAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  UserCredential,
  createUserWithEmailAndPassword,
  setPersistence,
  User,
  reload,
  browserLocalPersistence,
} from "firebase/auth";

import { auth as firebaseAuth } from "auth/config";

class Auth {
  token?: string | null = null;
  refreshToken?: string | null = null;
  uid?: string | null = null;
  email: string | null = null;
  auth: FirebaseAuth = firebaseAuth;
  storageKey: string = `firebase:authUser:${process.env.REACT_APP_FIREBASE_KEY}:[DEFAULT]`;

  constructor() {
    console.log("[AUTH] constructor");

    setPersistence(this.auth, browserLocalPersistence);
    // this.listenForAuthChanges();
  }

  getStoredSession() {
    const storedUser = this.getUserFromStorage();
    if (storedUser) {
      reload(storedUser)
        .then((res) => console.log("reload res", res))
        .then((err) => console.log("reload err", err));
    }
    // if (this.auth) {
    //   this.auth.currentUser
    //     ?.getIdToken()
    //     .then((res) => console.log("getIdToken res", res))
    //     .then((err) => console.log("getIdToken err", err));
    // }
  }

  getUserFromStorage(): User | undefined {
    const data = localStorage.getItem(this.storageKey);
    console.log("getUserFromStorage", sessionStorage.getItem(this.storageKey));
    if (data !== null && data !== undefined) {
      return JSON.parse(data) as User;
    }
  }

  async logIn(mail = "alt.s1-eo4iqzwp@yopmail.com", password = "password") {
    try {
      const res: UserCredential = await signInWithEmailAndPassword(
        this.auth,
        mail,
        password
      );
      console.log("[Login] MAPPING");
      // this.email = res?.user?.email || null;
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
      (user) => {
        console.log("onAuthStateChange", user);
        // use to redirect and reset state on logout
        console.log("this.current ", this.currentUser);
        if (!user) {
          console.log("NO user! ", user);
        }
      },
      (event: any) => {
        console.log("onAuthStateChanged error");
      }
    );
  }
}

export default new Auth();
