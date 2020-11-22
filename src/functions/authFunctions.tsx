import firebase from "firebase/app";
import "firebase/auth";

const updateLocalStorage = () => {
  const auth = firebase.auth();

  if (auth) {
    localStorage.setItem("user", JSON.stringify(auth.currentUser));
  } else {
    localStorage.setItem("user", null);
  }
};

//TODO: user verification things?
export const register = async (email: string, password: string) => {
  const auth = firebase.auth();
  await auth.createUserWithEmailAndPassword(email, password); //TODO catch errors
  //TODO: create info db entries

  updateLocalStorage();
  return auth.currentUser;
};

export const logInWithGoogle = async () => {
  const auth = firebase.auth();
  await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()); //TODO catch errors
  updateLocalStorage();
  //TODO: ensure user has user info db entry, if not create one

  return auth.currentUser;
};

export const logIn = async (email: string, password: string) => {
  const auth = firebase.auth();
  await auth.signInWithEmailAndPassword(email, password); //TODO catch errors
  updateLocalStorage();
  return auth.currentUser;
};

export const logOut = async () => {
  const auth = firebase.auth();
  await auth.signOut();
  updateLocalStorage();
  return auth.currentUser;
};
