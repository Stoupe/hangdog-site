import { Button, TextField } from "@material-ui/core";
import Router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/Contexts";
import NavBar from "../components/NavBar";
import styles from "../styles/register.module.scss";
import { register } from "./../functions/authFunctions";

const Register: React.FC = () => {
  const { user, setUser } = useContext(UserContext);

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
      alert("passwords don't match");
      return;
    }

    register(email, password)
      .then(() => {
        alert("registration successful");
        Router.reload();
      })
      .catch((err) => {
        alert(err);
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
              type="email"
              name="email"
              label="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              className={styles.inputField}
              type="password"
              name="password"
              label="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              className={styles.inputField}
              type="password"
              name="passwordConfirmation"
              label="confirm password"
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
