import { Link } from "@material-ui/core";
import React, { useContext } from "react";
import styles from "../styles/NavBar.module.scss";
import { UserContext } from "./Contexts";
import Container from "./BasicComponents/Container";

const NavBar: React.FC = () => {
  const { user } = useContext(UserContext);

  return (
    // <div>
    //   <Container invisible className={styles.root}>
    //     <Link href="/">
    //       <img src="hangdog-logo.png" height="130px" />
    //     </Link>
    //     <div>{user && <p>Hello, {user.displayName}</p>}</div>
    //   </Container>
    // </div>
    <div className={styles.header}>
      <Container invisible>
        <Link href="/">
          <img src="hangdog-logo.png" height="130px" />
        </Link>
        <div>{user && <p>Hello, {user.displayName}</p>}</div>
      </Container>
    </div>
  );
};

export default NavBar;
