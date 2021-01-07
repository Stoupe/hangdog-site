import { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import { UserContext } from "../components/Contexts";
import "../styles/globals.css";
import loadFirebase from "../functions/firebase";
import firebase from "firebase/app";
import { SnackbarProvider } from "notistack";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import { useMediaQuery } from "@material-ui/core";

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  loadFirebase();
  const [user, setUser] = useState<firebase.User>(null);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    const lsUser = localStorage.getItem("user");
    if (lsUser) {
      setUser(JSON.parse(lsUser));
    }
  }, []);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          // mode: prefersDarkMode ? "dark" : "light", //? automatically switch between modes
          mode: "light",
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
      }),
    [prefersDarkMode]
  );

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <SnackbarProvider maxSnack={10}>
            <Component {...pageProps} />
          </SnackbarProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </UserContext.Provider>
  );
};

export default App;
