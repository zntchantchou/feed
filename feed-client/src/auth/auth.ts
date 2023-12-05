import { FirebaseApp, initializeApp } from "firebase/app";
import {
  Auth as FirebaseAuth,
  initializeAuth,
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  UserCredential,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import firebaseConfig from "auth/config";
// create user
// log user in
// log user out () and redirect

class Auth {
  token?: string;
  refreshToken?: string;
  uid?: string;
  email?: string;
  auth: FirebaseAuth;

  constructor() {
    console.log("AUTH CONSTRUCTOR");
    const app = initializeApp(firebaseConfig);
    this.auth = initializeAuth(app);
    this.handleAuthChanges();
  }

  async logIn(email = "alt.s1-eo4iqzwp@yopmail.com", password = "password") {
    try {
      console.log("[Login]");
      const res: UserCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      this.email = res.user.email || undefined;
      this.uid = res.user.uid || undefined;
      this.refreshToken = res.user.refreshToken || undefined;
      this.token = await res.user.getIdToken();
      return res;
    } catch (e) {
      console.log("err: ", e);
    }
  }

  async createUser(email: string, password: string) {
    try {
      return await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (e) {
      console.log("createUser error: ", e);
    }
  }

  async logOut() {
    console.log("signOut");
    try {
      await signOut(this.auth);
      console.log("Auth [logout]");
    } catch (e) {
      console.log("Auth [logout] ERROR: ", e);
    }
  }

  isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }

  handleAuthChanges() {
    console.log("HANDLE AUTH CHANGES", this.auth);
    onAuthStateChanged(
      this.auth,
      (event: any) => {
        console.log("onAuthStateChange", event);
        // use to redirect and reset state on logout
        if (!event) {
          console.log("LOGGING OUT! ", event);
        }
      },
      (event: any) => {
        console.log("onAuthStateChanged error", event);
      }
    );
  }
}

export default new Auth();
