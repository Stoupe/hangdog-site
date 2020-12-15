import { Button, TextField } from "@material-ui/core";
import Router from "next/router";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/Contexts";
import NavBar from "../components/NavBar";
import styles from "../styles/register.module.scss";
import { register } from "./../functions/authFunctions";
import firebase from "firebase/app";

const Register: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  useEffect(() => {
    if (user) {
      Router.replace("/");
    }
  }, [user]);

  const registerNewUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      enqueueSnackbar("Passwords don't match", { variant: "warning" });
      return;
    }

    register(fName, lName, email, password)
      .then(() => {
        enqueueSnackbar("Registration Successful", { variant: "success" });
        Router.reload();
      })
      .catch((err: firebase.auth.Error) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  };

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.content}>
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              registerNewUser(e);
            }}
          >
            <TextField
              className={styles.inputField}
              required
              name="fName"
              label="First Name"
              variant="outlined"
              value={fName}
              onChange={(e) => setFName(e.target.value)}
            />
            <TextField
              className={styles.inputField}
              required
              name="lName"
              label="Last Name"
              variant="outlined"
              value={lName}
              onChange={(e) => setLName(e.target.value)}
            />
            <TextField
              className={styles.inputField}
              required
              type="email"
              name="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              className={styles.inputField}
              required
              type="password"
              name="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              className={styles.inputField}
              required
              type="password"
              name="passwordConfirmation"
              label="Confirm Password"
              variant="outlined"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <Button variant="contained" color="primary" type="submit">
              Register
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
