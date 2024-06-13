import React from "react";
import { Box, CircularProgress } from "@mui/material";

const GlobalLoader = ({ isLoading }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: isLoading ? "flex" : "none",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(210, 200, 200, 0.7)",
        zIndex: 999,
      }}
    >
      <CircularProgress sx={{ color: "#7f56da" }} />
    </Box>
  );
};

export default GlobalLoader;
