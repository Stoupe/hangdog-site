import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";

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

// const loadFirebase = () => {
//   if (firebase.apps.length === 0) {
//     // Initialize Firebase
//     firebase.initializeApp(firebaseConfig);

//     if ("measurementId" in firebaseConfig && typeof window !== "undefined") {
//       firebase.analytics();
//     }
//   }
// };

export const useFirebase = (): firebase.firestore.Firestore => {
  if (firebase.apps.length === 0) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    if ("measurementId" in firebaseConfig && typeof window !== "undefined") {
      firebase.analytics();
    }
  }

  const db = firebase.firestore();
  return db;
};

export const createTimestamp = firebase.firestore.Timestamp.fromDate;
// export const timestampToDate = firebase.firestore.Timestamp.toDate;
