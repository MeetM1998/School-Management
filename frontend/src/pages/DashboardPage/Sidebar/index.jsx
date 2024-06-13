import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { sidebarItems } from "../../../utils/constant";

const SideBar = ({ isVisible }) => {
  const userDetails = JSON.parse(localStorage.getItem("user_details"))?.role;
  const items = sidebarItems(userDetails);
  const sidebarWidth = isVisible ? 240 : 0;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        transition: "width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "& .MuiDrawer-paper": {
          width: sidebarWidth,
          backgroundColor: "#fff",
          color: "black",
          boxSizing: "border-box",
          transition: "width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          overflowX: "hidden",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography
          variant="h6"
          sx={{
            color: "black",
            textAlign: "center",
            fontWeight: 500,
            letterSpacing: 1,
            cursor: "pointer",
          }}
        >
          School Management
        </Typography>
      </Box>
      <List
        sx={{
          "& .MuiListItem-root:hover": {
            backgroundColor: "#3D5EE1",
          },
          "& .MuiListItem-root:hover .MuiListItemIcon-root, & .MuiListItem-root:hover .MuiListItemText-primary":
            {
              color: "#fff !important",
            },
          marginTop: "10px",
          padding: 3,
        }}
      >
        {items.map((item, index) => (
          <ListItem
            button
            component={Link}
            to={item.path}
            key={index}
            sx={{
              marginBottom: 2,
              "&:hover": {
                color: "white",
                backgroundColor: "#3D5EE1",
                "& .MuiSvgIcon-root": {
                  fill: "white",
                },
              },
            }}
          >
            <ListItemIcon sx={{ mr: 2, minWidth: "30px" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;
