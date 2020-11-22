import Router from "next/router";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../components/Contexts";
import NavBar from "../components/NavBar";
import styles from "../styles/profile.module.scss";

const Profile: React.FC = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      Router.replace("/");
    }
  }, []);

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Profile</h1>
          <p>Name: {user.displayName}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </>
  );
};

export default Profile;
