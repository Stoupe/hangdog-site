import React from "react";
import { Box } from "@material-ui/core";
import DashboardContentContainer from "./../../components/DashboardContentContainer";

type Props = {};

const NewDashboard: React.FC<Props> = (): JSX.Element => {
  return (
    // Dashboard content container
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <DashboardContentContainer width="30%"></DashboardContentContainer>
      <DashboardContentContainer width="30%"></DashboardContentContainer>
      <DashboardContentContainer width="30%"></DashboardContentContainer>
    </Box>
  );
};

export default NewDashboard;
