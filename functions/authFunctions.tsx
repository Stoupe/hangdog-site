import firebase from "firebase/app";
import "firebase/auth";

export const logIn = async () => {
  const auth = firebase.auth();
  await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  return auth.currentUser;
};

export const logOut = async () => {
  const auth = firebase.auth();
  await auth.signOut();
  return auth.currentUser;
};
