import { Button } from "@material-ui/core";
import Link from "next/link";
import React, { useContext } from "react";
import { UserContext } from "../components/Contexts";
import NavBar from "../components/NavBar";
import { logInWithGoogle, logOut } from "../functions/authFunctions";
import styles from "../styles/HomePage.module.scss";
import { useSnackbar } from "notistack";

// const classes = useStyles(() => {});

const HomePage: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();

  return (
    <div className={styles.HomePage}>
      <NavBar />
      <div className={"centered"}>
        <div className={"container"}>
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
                <Button variant="contained">Log In</Button>
              </Link>
              <Link href="register">
                <Button variant="contained">Register</Button>
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
                <Button variant="contained" color="inherit">
                  Profile
                </Button>
              </Link>
              <Link href="vouchers">
                <Button variant="contained" color="inherit">
                  Vouchers
                </Button>
              </Link>
              <Link href="vouchers-beta">
                <Button variant="contained" color="inherit">
                  Vouchers
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
    </div>
  );
};

export default HomePage;
