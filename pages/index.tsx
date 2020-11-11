import React, { useContext } from "react";
import Link from "next/link";
import { Button } from "@material-ui/core";
import { logIn, logOut } from "../functions/authFunctions";
import { UserContext } from "../components/Contexts";
import firebase from "firebase/app";

const HomePage = () => {
  const {
    user,
    setUser,
  }: {
    user: firebase.User;
    setUser: React.Dispatch<React.SetStateAction<firebase.User>>;
  } = useContext(UserContext);

  return (
    <>
      <Link href="dashboard">
        <a>Dashboard</a>
      </Link>

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
    </>
  );
};

export default HomePage;
