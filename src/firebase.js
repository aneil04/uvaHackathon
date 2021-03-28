import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const app = firebase.initializeApp({
    apiKey: "AIzaSyC9TWMGNKXlFJqvSPuLgs1kR_NlGbhS1NY",
    authDomain: "uva-hackathon-app.firebaseapp.com",
    projectId: "uva-hackathon-app",
    storageBucket: "uva-hackathon-app.appspot.com",
    messagingSenderId: "168993876799",
    appId: "1:168993876799:web:c9e2504827775bc761418a"
});

// Initialize Firebase
export const auth = app.auth()
export default firebase