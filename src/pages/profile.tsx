import Router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/Contexts";
import NavBar from "../components/NavBar";
import styles from "../styles/profile.module.scss";
import firebase from "firebase/app";
import "firebase/firestore";
// import { FirebaseUserType } from "../components/Types";
import { useSnackbar } from "notistack";
import { User } from "./../components/Schemas/User";
import { Card } from "@material-ui/core";
import Container from "../components/BasicComponents/Container";
import { stringify } from "querystring";

const Profile: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();

  const db = firebase.firestore();
  const [userInfo, setUserInfo] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // if (!user) {
    //   Router.replace("/");
    //   return;
    // }

    if (!user) return;

    const doc = db.collection("users").doc(user.uid);

    const observer = doc.onSnapshot(
      (docSnapshot) => {
        const data = docSnapshot.data() as User;
        console.log(data);
        setUserInfo(data);
        setLoading(false);
      },
      (err) => {
        enqueueSnackbar(err);
      }
    );

    return () => {
      observer();
    };
  }, [user]);

  return (
    <>
      <NavBar />
      <Container fullPage invisible>
        {!loading && (
          <Container column>
            <h1>Profile</h1>

            {/* <p>
              Name:{" "}
              {`${userInfo.personalDetails.fName.value} ${userInfo.personalDetails.lName.value}`}
            </p>
            <p>Email: {userInfo.personalDetails.email}</p>
            <p>{userInfo.userType}</p> */}

            {Object.entries(userInfo.personalDetails).map((key) => (
              <div key={key[0]}>
                {key[0]}: {JSON.stringify(key[1])}
              </div>
            ))}
          </Container>
        )}
      </Container>
    </>
  );
};

export default Profile;
