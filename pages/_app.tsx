import firebase from "firebase";
import { AppProps } from "next/app";
import { useEffect } from "react";
import "../styles/globals.css";

const firebaseConfig = {
  apiKey: "AIzaSyAeSggD2L9_7s6jOOHEWcfJZPmJ0HtxLZk",
  authDomain: "hangdog-ea266.firebaseapp.com",
  databaseURL: "https://hangdog-ea266.firebaseio.com",
  projectId: "hangdog-ea266",
  storageBucket: "hangdog-ea266.appspot.com",
  messagingSenderId: "454900698065",
  appId: "1:454900698065:web:5a53445ee8dd0886f52ef0",
  measurementId: "G-2M0C4TR4L5",
};

const App = ({ Component, pageProps }: AppProps) => {
  if (firebase.apps.length === 0) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }

  return <Component {...pageProps} />;
};

export default App;
