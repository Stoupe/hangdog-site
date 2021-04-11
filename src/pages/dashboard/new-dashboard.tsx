import React from "react";
import { Box } from "@material-ui/core";
import DashboardContentContainer from "./../../components/DashboardContentContainer";

const NewDashboard = (): JSX.Element => {
  // const classes = useStyles()

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "grid",
          gridTemplateRows: `100px auto`,
          gridTemplateColumns: `0.3fr 1fr 0.3fr`,
          gridTemplateAreas: `
          'header header header'
          'left main right'
        `,
          gap: "10px",
        }}
      >
        <header style={{ gridArea: "header", background: "green" }}>
          header
        </header>

        <div style={{ gridArea: "left", background: "yellow" }}>left</div>
        <div style={{ gridArea: "main", background: "blue" }}>main</div>
        <div style={{ gridArea: "right", background: "orange" }}>right</div>

        {/* <DashboardContentContainer width="30%"></DashboardContentContainer>
      <DashboardContentContainer width="30%"></DashboardContentContainer>
      <DashboardContentContainer width="30%"></DashboardContentContainer> */}
      </Box>
    </>
  );
};

export default NewDashboard;
