import { error } from '@pnotify/core';
import { defaults } from '@pnotify/core';
import { defaultModules } from './../../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from './../../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
defaultModules.set(PNotifyMobile, {});
defaults.addClass = 'animate__animated animate__pulse pnotify__position';
defaults.mode = 'dark';
defaults.sticker = false;

import firebase from '@firebase/app';
import '@firebase/auth';
import emailValidator from 'email-validator';

class AuthService {

  #CURRENT_USER_KEY = "current-user";
  
  #firebaseConfig = {
    apiKey: 'AIzaSyDYwXZs_eihXdWAx_yoWc4pt3tmvrkveq4',
    authDomain: 'event-booster-project.firebaseapp.com',
    projectId: 'event-booster-project',
    storageBucket: 'event-booster-project.appspot.com',
    messagingSenderId: '349651813333',
    appId: '1:349651813333:web:89fcd4fb6c29a0bf7b735c',
  };

  constructor() {
    firebase.initializeApp(this.#firebaseConfig);
  }

  getCurrentUser() {
    return localStorage.getItem(this.#CURRENT_USER_KEY);
  }

  signUp(email, password) {

    if (!emailValidator.validate(email)) {
      error({ text: `${email ? email : 'Empty string'} is invalid email.` });
      return Promise.resolve(false);
    }

    return firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(_ => localStorage.setItem(this.#CURRENT_USER_KEY, firebase.auth().currentUser.uid))
        .then(_ => true)
        .catch((er) => {
          error(er.message);
          return false;
        });
    
  }

  signIn(email, password) {
  
      if (!emailValidator.validate(email)) {
          error(`${email ? email : 'Empty string'} is invalid email.`);
          return Promise.resolve(false);
      }

      return firebase.auth()
          .signInWithEmailAndPassword(email, password)
          .then(_ => localStorage.setItem(this.#CURRENT_USER_KEY, firebase.auth().currentUser.uid))
          .then(_ => true)
          .catch((er) => {
            error(er.message);
            return false;
          });
  }

  logOut() {
      return firebase.auth()
          .signOut()
          .then(_ => localStorage.removeItem(this.#CURRENT_USER_KEY))
          .catch((er) => error(er));
  }
}

export default AuthService;
