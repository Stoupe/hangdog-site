import { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import { UserContext } from "../components/Contexts";
import "../styles/globals.css";
import loadFirebase from "../functions/firebase";
import firebase from "firebase/app";
import { SnackbarProvider } from "notistack";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
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
      // type: "light",
      primary: {
        main: "#95d2a3",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#e35454",
        contrastText: "#ffffff",
      },
    },
    typography: {
      button: {
        textTransform: "none",
      },
      // fontFamily: "Product Sans Medium",
    },
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={10}>
          <Component {...pageProps} />
        </SnackbarProvider>
      </ThemeProvider>
    </UserContext.Provider>
  );
};

export default App;
