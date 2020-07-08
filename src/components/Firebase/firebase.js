import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyDd7erw5PpXokLZKfWNWUi0YLXdkyW_xr0",
    authDomain: "chinguv21gecko02.firebaseapp.com",
    databaseURL: "https://chinguv21gecko02.firebaseio.com",
    projectId: "chinguv21gecko02",
    storageBucket: "chinguv21gecko02.appspot.com",
    messagingSenderId: "974304764133",
    appId: "1:974304764133:web:c4f7df717adcd3990e740c",
    measurementId: "G-EQJMFH0G61"
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth
            .createUserWithEmailAndPassword(email, password)


    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    doProfileUpdate = (profile) => {
        const [firstName, lastName, address, city, state, zip, bio] = profile
        return this.db
            .collection("users")
            .doc(this.auth.currentUser.uid)
            .set({ firstName, lastName, address, city, state, zip, bio })
    }

}

export default Firebase;