import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const app = firebase.initializeApp({
    apiKey: "AIzaSyDjEEVdxV1JCVoHLtxz43aqccYTZx0Ast0",
    authDomain: "uva-hackathon.firebaseapp.com",
    projectId: "uva-hackathon",
    storageBucket: "uva-hackathon.appspot.com",
    messagingSenderId: "460907383800",
    appId: "1:460907383800:web:cc46ff108a44f0b608e40d"

})

export const database = app.firestore()
export const auth = app.auth()
export default app