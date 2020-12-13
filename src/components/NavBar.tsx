import { Button, Link } from "@material-ui/core";
import React from "react";
import styles from "../styles/NavBar.module.scss";

const NavBar: React.FC = () => {
  return (
    <div className={styles.header}>
      <Link href="/">
        <Button variant="outlined">Home</Button>
      </Link>
    </div>
  );
};

export default NavBar;
