import { Button } from "@material-ui/core";
import Link from "next/link";
import React, { useContext } from "react";
import { UserContext } from "../components/Contexts";
import { logIn, logOut } from "../functions/authFunctions";
import styles from "../styles/index.module.scss";

const HomePage = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {!user ? (
          <Button
            variant="contained"
            color="primary"
            onClick={async () => {
              const user = await logIn();
              setUser(user);
            }}
          >
            Log In
          </Button>
        ) : (
          <>
            <p>Hello, {user.displayName}</p>
            <Link href="dashboard">
              <Button variant="contained" color="primary">
                Dashboard
              </Button>
              {/* <a>Dashboard</a> */}
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
  );
};

export default HomePage;
