import { Box, Button, Link, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
// import styles from "../../styles/dashboard/DashboardHeader.module.scss";
// import Container from "../BasicComponents/Container";
import { format } from "date-fns";
import { useBoxShadow } from "./../../functions/useBoxShadow";
import { time } from "console";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    // width: "100%",
    // backgroundColor: "pink",
  },
  headerSides: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  pageTitle: {
    fontWeight: 600,
  },
  time: {
    border: ".5rem solid #222",
    boxShadow: useBoxShadow(),
    marginLeft: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  buttons: {
    "& > button": {
      paddingRight: "1rem",
      borderRadius: "1rem",
      margin: ".5rem",
    },
  },
}));

const DashboardHeader: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const classes = useStyles();
  // const [currentStaff, setCurrentStaff] = useState("Henry");

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box className={classes.root}>
      <Box className={classes.headerSides}>
        <Typography variant="h2" className={classes.pageTitle}>
          Dashboard
        </Typography>
        <Box className={classes.time}>
          <Typography variant="caption">
            {format(currentTime, "EEEE do MMM")}
          </Typography>
          <Typography variant="h4">
            {format(currentTime, "h:mmaaaaa")}m
          </Typography>
          <p></p>
        </Box>
      </Box>
      <Box className={classes.headerSides}>
        <Box className={classes.buttons}>
          <Button variant="contained">Henry</Button>
          <Button variant="contained">George</Button>
          <Button variant="contained">Lindsay</Button>
        </Box>

        <Link href="/">
          <img src="hangdog-logo.png" height="120px"></img>
        </Link>
      </Box>
    </Box>
  );
};

export default DashboardHeader;
