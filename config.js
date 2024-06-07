import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database'; // Importar o Realtime Database

const firebaseConfig = {
    apiKey: "AIzaSyCt2npdQH-STYTikk5D8lSZb3Q_oEgja94",
    authDomain: "appnotas-8a800.firebaseapp.com",
    projectId: "appnotas-8a800",
    storageBucket: "appnotas-8a800.appspot.com",
    messagingSenderId: "563466070443",
    appId: "1:563466070443:web:956c0bedc71307d9c98aee",
    measurementId: "G-V0PXQKJP05",
  };

  if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }


  export { firebase }