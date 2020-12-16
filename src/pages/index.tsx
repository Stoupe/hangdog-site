import { Button } from "@material-ui/core";
import Link from "next/link";
import React, { useContext } from "react";
import { UserContext } from "../components/Contexts";
import NavBar from "../components/NavBar";
import { logInWithGoogle, logOut } from "../functions/authFunctions";
import styles from "../styles/index.module.scss";
import { useSnackbar } from "notistack";

const HomePage = () => {
  const { user, setUser } = useContext(UserContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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
                  logInWithGoogle()
                    .then((user) => {
                      setUser(user);
                      enqueueSnackbar("Successfully logged in with Google", {
                        variant: "success",
                      });
                    })
                    .catch((err) => {
                      enqueueSnackbar(err.toString(), { variant: "error" });
                    });
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
                  logOut()
                    .then((user) => {
                      setUser(user);
                      enqueueSnackbar("Logged Out", { variant: "success" });
                    })
                    .catch((err) => {
                      enqueueSnackbar(err, { variant: "error" });
                    });
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
