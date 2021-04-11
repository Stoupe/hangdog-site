import React from "react";
import { Box } from "@material-ui/core";

type Props = {
  width: string;
  children?: React.ReactNode;
};

const DashboardContentContainer = ({ children, width }: Props): JSX.Element => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: 20,
        background: "yellow",
      }}
    >
      {children}
    </Box>
  );
};

export default DashboardContentContainer;
