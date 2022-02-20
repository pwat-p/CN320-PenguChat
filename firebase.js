import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBMoqyI8ktt_K7OSUGLACOU_3oxcDfpX1c",
  authDomain: "penguchatapp.firebaseapp.com",
  projectId: "penguchatapp",
  storageBucket: "penguchatapp.appspot.com",
  messagingSenderId: "215416479360",
  appId: "1:215416479360:web:4d2b53a9958d88d0bf9065"
}

  let app

  if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
  } else {
    app = firebase.app()
  }

  const db = app.firestore()
  const auth = firebase.auth()
 
  export { db, auth }