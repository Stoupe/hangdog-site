import { Button, TextField } from "@material-ui/core";
import Router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/Contexts";
import NavBar from "../components/NavBar";
import { logIn } from "../functions/authFunctions";
import styles from "../styles/login.module.scss";

const Login: React.FC = () => {
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      Router.replace("/");
    }
  }, [user]);

  const loginUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    logIn(email, password)
      .then(() => {
        alert("successful login");
        Router.reload();
      })
      .catch((err) => {
        alert(err);
      });

    console.log("logging in user");
  };

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.content}>
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              loginUser(e);
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

            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
