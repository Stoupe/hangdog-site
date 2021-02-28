import { Box, Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "50rem",
    height: "50rem",
  },
  title: {
    padding: "1rem",
    margin: "1rem",
  },
  contentBox: {
    boxShadow: "0 2px 20px rgba(000, 000, 000, 0.1)",
    borderRadius: "1rem",
  },
}));

type Props = {
  title: string;
  children: React.ReactNode;
};

const DashboardContentBox = ({ title, children }: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        {title}
      </Typography>
      {/* <h1 className={classes.title}>{title}</h1> */}
      <Container className={classes.contentBox}>{children}</Container>
    </Box>
  );
};

export default DashboardContentBox;
