"use client";
import { useState } from "react";
import { Switch, Avatar, Badge, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SmsIcon from '@mui/icons-material/Sms';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="navbar-container">
      <div></div>
      <div className="navbar-icons">
        {/* Dark Mode Toggle */}
        <Switch
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          color="default"
        />

        {/* Notification & Chat Icons */}
        <IconButton className="navbar-icon-btn">
          <Badge variant="dot" color="error">
            <NotificationsNoneIcon />
          </Badge>
        </IconButton>

        <IconButton className="navbar-icon-btn">
          <Badge variant="dot" color="error">
            <SmsIcon />
          </Badge>
        </IconButton>

        {/* User Profile Dropdown */}
        <div className="navbar-profile" onClick={handleClick}>
          <div className="navbar-profile-text">
            <Typography variant="body2" className="title">
              John Doe
            </Typography>
            <Typography variant="caption">
              Verified Member
            </Typography>
          </div>
          <Avatar src="/avatar.jpg" alt="John Doe" />
          <KeyboardArrowDownIcon />
        </div>

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          className="navbar-dropdown"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Settings</MenuItem>
          <MenuItem onClick={handleClose} className="text-red-600">
            Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
