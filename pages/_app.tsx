import { AppProps } from "next/app";
import "../styles/globals.css";
import loadFirebase from "./../components/firebase";

const App = ({ Component, pageProps }: AppProps) => {
  loadFirebase();
  return <Component {...pageProps} />;
};

export default App;
