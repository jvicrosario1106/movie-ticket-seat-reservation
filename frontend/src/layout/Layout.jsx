import React from "react";
import {
  AppBar,
  Drawer,
  Toolbar,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { useState } from "react";
import {
  FcBarChart,
  FcSettings,
  FcCalendar,
  FcClapperboard,
  FcUnlock,
  FcConferenceCall,
} from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const { isSuccess } = useSelector((state) => state.authReducer);
  const drawerWidth = 240;
  const navigate = useNavigate();

  const lists = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FcBarChart size={30} />,
    },
    {
      name: "Movies",
      path: "/movies",
      icon: <FcClapperboard size={30} />,
    },
    {
      name: "Booking",
      path: "/bookings",
      icon: <FcCalendar size={30} />,
    },
    {
      name: "Theater Settings",
      path: "/theaters",
      icon: <FcSettings size={30} />,
    },
    {
      name: "Users",
      path: "/users",
      icon: <FcConferenceCall size={30} />,
    },
    {
      name: "Logout",
      path: "/",
      icon: <FcUnlock size={30} />,
    },
  ];

  return (
    <div style={{ display: "flex" }}>
      {isSuccess && (
        <div>
          <AppBar sx={{ width: `calc(100% - ${drawerWidth}px)` }}>
            <Toolbar>
              <Typography variant="h5">Hello, Welcome!</Typography>
            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          >
            <Drawer
              sx={{
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
              variant="permanent"
              open={true}
            >
              <Typography sx={{ p: "20px", textAlign: "center" }} variant="h5">
                Cinephile
              </Typography>
              <Divider />
              <List>
                {lists.map((list) => (
                  <ListItem
                    button
                    key={list.name}
                    onClick={() => navigate(list.path)}
                  >
                    <ListItemIcon>{list.icon}</ListItemIcon>
                    <ListItemText primary={list.name} />
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </Box>
        </div>
      )}

      <Box
        component={"main"}
        sx={{
          flexGrow: 1,
          background: "rgba(236, 240, 241,0.6)",
          p: 3,
          sm: { width: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </div>
  );
};

export default Layout;
