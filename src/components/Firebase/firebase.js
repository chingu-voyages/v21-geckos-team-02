import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { mockData } from './mock-data'

var firebaseConfig = {
    apiKey: "AIzaSyB6wYT2Ax5dgJ-kjLkxy8XZ89gK6lNnHts",
    authDomain: "chingu-v21-gecho-02.firebaseapp.com",
    databaseURL: "https://chingu-v21-gecho-02.firebaseio.com",
    projectId: "chingu-v21-gecho-02",
    storageBucket: "chingu-v21-gecho-02.appspot.com",
    messagingSenderId: "748127105525",
    appId: "1:748127105525:web:983360bf4adfabfa3bf0bc",
    measurementId: "G-6ZWGLLZQ1Y"
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
    }

    doCreateUserWithEmailAndPassword = (inputs) => {
        const { email, password, firstName, lastName } = inputs

        return this.auth
            .createUserWithEmailAndPassword(email, password)
            .then(user => {
                const displayName = user.user.email.split('@')[0]
                return this.auth.currentUser.updateProfile({ displayName })
            })
            .then(() => {
                console.log(this.auth.currentUser);
                return this.db
                    .collection("users")
                    .doc(this.auth.currentUser.uid)
                    .set({ firstName, lastName })
            })
            .catch(error => console.error("Error: ", error))
    }


    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password)
            .catch(error => console.error("Error: ", error))

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    doProfileUpdate = (profile) => {
        return this.db
            .collection("users")
            .doc(this.auth.currentUser.uid)
            .set(profile)
            .catch(error => console.error("Error: ", error))
    }

    doSetMockData = () => {
        for (let profile of mockData) {
            const reduced = { ...profile }
            delete reduced["uid"]
            this.db
                .collection("users")
                .doc(profile.uid)
                .set(reduced)
                .then(() => console.log("Wrote: ", profile))
                .catch(error => console.error("Error: ", error))
        }
    }

    doGetAllUsers = (callback) => {
        this.db
            .collection("users")
            .get()
            .then(callback)

    }

}

export default Firebase;