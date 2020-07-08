import app from 'firebase/app';

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
    }
}

export default Firebase;