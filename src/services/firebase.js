// import the firebase core module
import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyChgFagRhydqn4vnD77ypHli4E4cTQ52TY",
    authDomain: "react-dev-skills-d2b09.firebaseapp.com",
    projectId: "react-dev-skills-d2b09",
    storageBucket: "react-dev-skills-d2b09.appspot.com",
    messagingSenderId: "207769184068",
    appId: "1:207769184068:web:65aeb77e9346aa46ead911"
  }

  //initialize the firebase app
  firebase.initializeApp(firebaseConfig)
  // setup a firebase server
  const provider = new firebase.auth.GoogleAuthProvider()
  const auth = firebase.auth()

  //setup auth actions (login, logout)
  function login() {
      auth.signInWithPopup(provider)
  }

  function logout() {
      auth.signOut()
  }

  export {
      auth,
      login,
      logout,
  }