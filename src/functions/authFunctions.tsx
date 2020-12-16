import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { FirebaseDefaultUserType, FirebaseUserType } from "../components/Types";

const defaultUser: FirebaseDefaultUserType = {
  userType: "Guest",
  phone: null,
  emergencyContact: null,
  birthday: null,
  ageCategory: "Unknown",
  height: null,
  studentID: null,
  profilePhoto: null,
  currentMembershipDetails: null,
  tenTripDetails: null,
  cardDetails: null,
  licenses: null,
};

const updateLocalStorage = () => {
  const auth = firebase.auth();

  if (auth) {
    localStorage.setItem("user", JSON.stringify(auth.currentUser));
  } else {
    localStorage.setItem("user", null);
  }
};

const userInfoExists = async (email: string) => {
  const db = firebase.firestore();
  const usersRef = db.collection("users").doc(email);
  let exists: boolean;
  usersRef
    .get()
    .then((docSnapshot) => {
      exists = docSnapshot.exists;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
  return Promise.resolve(exists);
};

/**
 * Create a new entry in the users db collection for the specified user.
 * ! If a doc already exists, this function will overwrite it
 * @param fName
 * @param lName
 * @param email
 */
const createUserInfo = async (fName: string, lName: string, email: string) => {
  const db = firebase.firestore();

  const user: FirebaseUserType = {
    ...defaultUser,
    fName: { value: fName, public: true },
    lName: { value: lName, public: false },
    email: email,
  };

  console.log(user);

  try {
    await db.collection("users").doc(email).set(user);
  } catch (err) {
    return Promise.reject(err);
  }

  return Promise.resolve();
};

//TODO: user verification things?
export const register = async (
  fName: string,
  lName: string,
  email: string,
  password: string
) => {
  const auth = firebase.auth();

  try {
    await auth.createUserWithEmailAndPassword(email, password);
    await createUserInfo(fName, lName, email);
  } catch (err) {
    return Promise.reject(err);
  }

  updateLocalStorage();
  return Promise.resolve(auth.currentUser);
};

/**
 * Logging in with Google OAuth
 */
export const logInWithGoogle = async () => {
  const auth = firebase.auth();

  try {
    await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

    if (!auth.currentUser) {
      throw new Error("auth.currentUser is still null");
    }

    const userExistsInDB = await userInfoExists(auth.currentUser.email);
    if (!userExistsInDB) {
      const names = auth.currentUser.displayName.split(" ");

      if (names.length < 2) {
        throw new Error("displayName is less than two words");
      }

      const fName = names[0];
      const lName = names.slice(1).join(" ");
      const email = auth.currentUser.email;

      await createUserInfo(fName, lName, email);
    }
  } catch (err) {
    return Promise.reject(err);
  }

  updateLocalStorage();
  return Promise.resolve(auth.currentUser);
};

/**
 * Attempt to log in a user with email & password
 */
export const logIn = async (email: string, password: string) => {
  const auth = firebase.auth();

  try {
    //TODO: If a user tries to sign in with an email associated with a Google account, the page should give them this information
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    return Promise.reject(err);
  }

  updateLocalStorage();
  return auth.currentUser;
};

/**
 * Attempt to log out the current user
 */
export const logOut = async () => {
  const auth = firebase.auth();

  try {
    await auth.signOut();
  } catch (err) {
    return Promise.reject(err);
  }

  updateLocalStorage();
  return Promise.resolve(auth.currentUser);
};
