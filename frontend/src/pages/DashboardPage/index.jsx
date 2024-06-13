import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import SideBar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashboardMain = () => {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Box
        sx={{
          transition: "width 0.3s ease",
          overflow: "hidden",
        }}
      >
        <SideBar isVisible={isVisible} />
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Header setIsVisible={setIsVisible} isVisible={isVisible} />
        <Box
          sx={{
            backgroundColor: "#F5F5F8",
            padding: 3,
            height: "100vh",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardMain;
