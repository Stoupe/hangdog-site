import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { FirebaseUserType } from "../components/Types";

const updateLocalStorage = () => {
  const auth = firebase.auth();

  if (auth) {
    localStorage.setItem("user", JSON.stringify(auth.currentUser));
  } else {
    localStorage.setItem("user", null);
  }
};

const createUserInfo = async (fName: string, lName: string, email: string) => {
  const auth = firebase.auth();
  const db = firebase.firestore();

  const uid = auth.currentUser.uid;

  const user: FirebaseUserType = {
    fName: { value: fName, public: true },
    lName: { value: lName, public: false },
    email: email,
    phone: null,
    emergencyContact: {
      name: null,
      email: null,
      phone: null,
    },
    age: null,
    ageCategory: "Adult",
    height: null,
    studentID: {
      photo: null,
      expiry: null,
    },
    profilePhoto: {
      value: null,
      public: false,
    },
    userType: "Guest",
    currentMembershipDetails: {
      ongoing: false,
      offPeak: false,
      trial: false,
      membershipType: null,
      membershipStartDate: null,
      membershipEndDate: null,
      membershipCostPM: null,
    },
    tenTripDetails: {
      tripsRemaining: 0,
      lastToppedUp: null,
    },
    cardDetails: {
      stripeID: null,
    },
    licenses: {
      belay: {
        value: false,
        dateGranted: null,
      },
      lead: {
        value: false,
        dateGranted: null,
      },
    },
  };

  await db.collection("users").doc(uid).set(user);
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

export const logInWithGoogle = async () => {
  const auth = firebase.auth();
  await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()); //TODO: catch errors
  updateLocalStorage();
  //TODO: ensure user has user info db entry, if not create one

  return auth.currentUser;
};

export const logIn = async (email: string, password: string) => {
  const auth = firebase.auth();
  await auth.signInWithEmailAndPassword(email, password); //TODO: catch errors
  updateLocalStorage();
  return auth.currentUser;
};

export const logOut = async () => {
  const auth = firebase.auth();
  await auth.signOut();
  updateLocalStorage();
  return auth.currentUser;
};
