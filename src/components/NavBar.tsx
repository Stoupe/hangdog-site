import { Link } from "@material-ui/core";
import React, { useContext } from "react";
import styles from "../styles/NavBar.module.scss";
import { UserContext } from "./Contexts";

const NavBar: React.FC = () => {
  const { user } = useContext(UserContext);

  return (
    <div className={styles.header}>
      <Link href="/">
        {/* <Button variant="outlined">Home</Button> */}
        <img src="hangdog-logo.png" height="130px" />
      </Link>
      <div>{user && <p>Hello, {user.displayName}</p>}</div>
    </div>
  );
};

export default NavBar;
