import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { mockData } from "./mock-data";
import { appUrl } from "../../appUrl";

var firebaseConfig = {
  apiKey: "AIzaSyB6wYT2Ax5dgJ-kjLkxy8XZ89gK6lNnHts",
  authDomain: "chingu-v21-gecho-02.firebaseapp.com",
  databaseURL: "https://chingu-v21-gecho-02.firebaseio.com",
  projectId: "chingu-v21-gecho-02",
  storageBucket: "chingu-v21-gecho-02.appspot.com",
  messagingSenderId: "748127105525",
  appId: "1:748127105525:web:983360bf4adfabfa3bf0bc",
  measurementId: "G-6ZWGLLZQ1Y",
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
  }

  doCreateUserWithEmailAndPassword = (inputs) => {
    const { email, password, firstName, lastName, newUser, photoURL } = inputs;

    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const displayName = user.user.email.split("@")[0];
        const photoURL = "";

        return this.auth.currentUser.updateProfile({
          displayName,
          photoURL,
        });
      })
      .then(() => {
        return this.db.collection("users").doc(this.auth.currentUser.uid).set({
          firstName,
          lastName,
          newUser,
          photoURL,
        });
      });
  };

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => {
    this.auth.signOut();
  };

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: `${appUrl}/signup`,
    });

  doProfileUpdate = (profile) => {
    return this.db
      .collection("users")
      .doc(this.auth.currentUser.uid)
      .set(profile)
      .catch((error) => console.error("Error: ", error));
  };

  doSetMockData = () => {
    for (let profile of mockData) {
      const reduced = { ...profile };
      delete reduced["uid"];
      this.db
        .collection("users")
        .doc(profile.uid)
        .set(reduced)
        .then(() => console.log("Wrote: ", profile))
        .catch((error) => console.error("Error: ", error));
    }
  };

  doGetAllUsers = (callback) => {
    this.db.collection("users").get().then(callback);
  };

  doGetUserProfile = (uid, callback) => {
    return this.db.collection("users").doc(uid).get().then(callback);
  };

  getStorage = () => {
    return this.storage;
  };

  getFirestore = () => {
    return this.db;
  };

  getAuth = () => {
    return this.auth;
  };

  // *** User API***
  user = (uid) => this.db.ref(`users/${uid}`);
  users = () => this.db.ref("users");

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) => {
    this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.user(authUser.uid)
          .once("value")
          .then((snapshot) => {
            const dbUser = snapshot.val();

            //default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
            }

            //merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });
  };
}

export default Firebase;
