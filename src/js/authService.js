import firebase from '@firebase/app';
import '@firebase/auth';
import emailValidator from 'email-validator';

class AuthService {

    #firebaseConfig = {
        apiKey: "AIzaSyDYwXZs_eihXdWAx_yoWc4pt3tmvrkveq4",
        authDomain: "event-booster-project.firebaseapp.com",
        projectId: "event-booster-project",
        storageBucket: "event-booster-project.appspot.com",
        messagingSenderId: "349651813333",
        appId: "1:349651813333:web:89fcd4fb6c29a0bf7b735c"
    };

    constructor() {
        firebase.initializeApp(this.#firebaseConfig);
    }

    getCurrentUser() {
        return firebase.auth().currentUser;
    }

    signUp(email, password) {
        
        if (!emailValidator.validate(email)) {
            alert(`${email ? email : 'Empty string'} is invalid email.`);
            return Promise.resolve(false);
        }

        return firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(_ => true)
            .catch((error) => alert(error.message));
    }

    signIn(email, password) {

        if (!emailValidator.validate(email)) {
            alert(`${email ? email : 'Empty string'} is invalid email.`);
            return Promise.resolve(false);
        }

        return firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(_ => true)
            .catch((error) => alert(error.message));
    }

    logOut() {
        return firebase.auth()
            .signOut()
            .catch((error) => console.log(error));
    }
}

export default AuthService;