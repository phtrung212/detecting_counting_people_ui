import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDiXf7IMQvzoqWxT7QL5TWaYZTo1ss3x2U",
    authDomain: "datnreport.firebaseapp.com",
    databaseURL: "https://datnreport.firebaseio.com",
    projectId: "datnreport",
    storageBucket: "datnreport.appspot.com",
    messagingSenderId: "102656873251"
})
}

export default firebase
