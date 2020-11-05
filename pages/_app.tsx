import { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import { UserContext } from "../components/UserContext";
import "../styles/globals.css";
import loadFirebase from "./../components/firebase";
import firebase from "firebase/app";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const App = ({ Component, pageProps }: AppProps) => {
  loadFirebase();
  const [user, setUser] = useState<firebase.User>(null);

  useEffect(() => {
    const lsUser = localStorage.getItem("user");
    if (lsUser) {
      setUser(JSON.parse(lsUser));
    }
  }, []);

  const theme = createMuiTheme({
    palette: {
      type: "light",
      primary: {
        light: "#757ce8",
        main: "#3f50b5",
        dark: "#002884",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ff7961",
        main: "#f44336",
        dark: "#ba000d",
        contrastText: "#000",
      },
    },
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </UserContext.Provider>
  );
};

export default App;
