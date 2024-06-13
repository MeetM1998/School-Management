import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { pages } from "../../../utils/constant";

const Header = ({ setIsVisible, isVisible }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleCloseNavigate = (link) => {
    navigate(link);
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#fff" }}>
      <Toolbar sx={{ marginTop: "5px" }}>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <IconButton
            onClick={toggleSidebar}
            sx={{
              transition: "right 0.3s ease",
              color: "#fff",
              padding: "6px",
              backgroundColor: "#3D5EE1",
              "&:hover": {
                backgroundColor: "#3D5EE1",
              },
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ color: "black" }}>
            Dashboard
          </Typography>
        </Box>
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          sx={{ color: "black", ml: 2 }}
        >
          <AccountCircleIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {pages?.map((page, index) => (
            <MenuItem
              key={index}
              onClick={() => handleCloseNavigate(page?.link)}
            >
              <Typography textAlign="center">{page?.name}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
