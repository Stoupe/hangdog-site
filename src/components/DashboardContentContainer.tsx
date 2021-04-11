import React from "react";
import { Box } from "@material-ui/core";

type Props = {
  width: string;
};

const DashboardContentContainer: React.FC<Props> = ({
  children,
  width,
}): JSX.Element => {
  return (
    <Box
      sx={{
        width: { width },
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
