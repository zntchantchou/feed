import {
  Auth as FirebaseAuth,
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  UserCredential,
  createUserWithEmailAndPassword,
} from "firebase/auth";
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
    this.auth = getAuth();
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
    onAuthStateChanged(
      this.auth,
      (event: any) => {
        // use to redirect and reset state on logout
        if (!event) console.log("LOGGING OUT!", event);
        console.log("onAuthStateChanged event", event);
        console.log("His.Auth.CurrentUSER ", this.auth.currentUser);
      },
      (event: any) => {
        console.log("onAuthStateChanged error", event);
      }
    );
  }
}

export default new Auth();
