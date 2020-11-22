import { Button } from "@material-ui/core";
import Link from "next/link";
import React, { useContext } from "react";
import { UserContext } from "../components/Contexts";
import NavBar from "../components/NavBar";
import { logInWithGoogle, logOut } from "../functions/authFunctions";
import styles from "../styles/index.module.scss";

const HomePage = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.content}>
          {!user ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={async () => {
                  const user = await logInWithGoogle();
                  setUser(user);
                }}
              >
                Log In with Google
              </Button>
              <Link href="login">
                <Button variant="contained" color="default">
                  Log In
                </Button>
              </Link>
              <Link href="register">
                <Button variant="contained" color="default">
                  Register
                </Button>
              </Link>
            </>
          ) : (
            <>
              <p>Hello, {user.displayName}</p>
              <p>
                <em>{user.email}</em>
              </p>
              <Link href="dashboard">
                <Button variant="contained" color="primary">
                  Dashboard
                </Button>
              </Link>
              <Link href="profile">
                <Button variant="contained" color="default">
                  Profile
                </Button>
              </Link>
              <Button
                variant="contained"
                color="secondary"
                onClick={async () => {
                  const user = await logOut();
                  setUser(user);
                }}
              >
                Log Out
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
