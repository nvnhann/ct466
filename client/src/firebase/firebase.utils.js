import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
    apiKey: "AIzaSyAl6ip4dXT-b9ADJmRppKq6oUtWJL26NqA",
    authDomain: "ct466-nlcn-5050d.firebaseapp.com",
    projectId: "ct466-nlcn-5050d",
    storageBucket: "ct466-nlcn-5050d.appspot.com",
    messagingSenderId: "931722807435",
    appId: "1:931722807435:web:d49691d14bccaef19a2c8e",
    measurementId: "G-RYY8W89EPV"
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
const  provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({promt: 'select_account'});
export  const signInWithGoogle = () =>auth.signInWithPopup(provider);
export default firebase;