import Router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/Contexts";
import NavBar from "../components/NavBar";
import styles from "../styles/profile.module.scss";
import firebase from "firebase/app";
import "firebase/firestore";
import { FirebaseUserType } from "../components/Types";

const Profile: React.FC = () => {
  const { user, setUser } = useContext(UserContext);

  const db = firebase.firestore();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!user) {
      Router.replace("/");
    }
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((info) => {
        console.log(JSON.stringify(info.data()));
        setUserInfo(info.data());
      });
  }, []);

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Profile</h1>
          <p>Name: {`${userInfo.fName.value} ${userInfo.lName.value}`}</p>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </>
  );
};

export default Profile;
