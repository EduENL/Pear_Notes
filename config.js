import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database'; // Importar o Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyCP289-egI5pDlhtAASG9deONAyIhYoVx8",
  authDomain: "appnotas-8a800.firebaseapp.com",
  projectId: "appnotas-8a800",
  storageBucket: "appnotas-8a800.appspot.com",
  messagingSenderId: "563466070443",
  appId: "1:563466070443:android:f577c02c9ba385adc98aee"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export { firebase };
