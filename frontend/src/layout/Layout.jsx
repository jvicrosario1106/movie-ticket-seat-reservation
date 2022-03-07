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
import {
  FcBarChart,
  FcSettings,
  FcCalendar,
  FcClapperboard,
  FcUnlock,
  FcConferenceCall,
} from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../slice/authSlice";

const Layout = ({ children }) => {
  const { isSuccess } = useSelector((state) => state.authReducer);
  const drawerWidth = 240;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  const logoutUserSubmit = () => {
    dispatch(logoutUser());
    navigate("/");
  };

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
  ];

  const customerlists = [
    {
      name: "Coming Soon",
      path: "/",
      icon: <FcConferenceCall size={30} />,
    },
    {
      name: "Movies",
      path: "/movies",
      icon: <FcClapperboard size={30} />,
    },
    {
      name: "Book Now",
      path: "/booknow",
      icon: <FcCalendar size={30} />,
    },
    {
      name: "My Books",
      path: "/mybook",
      icon: <FcSettings size={30} />,
    },
  ];

  return (
    <div style={{ display: "flex" }}>
      {user && (
        <div>
          <AppBar sx={{ width: `calc(100% - ${drawerWidth}px)` }}>
            <Toolbar>
              <Typography variant="h5">Hello, {user.firstname}!</Typography>
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
              {user.type === "admin" ? (
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
                  {/* Logout Nav */}
                  <ListItem button onClick={logoutUserSubmit}>
                    <ListItemIcon>{<FcUnlock size={30} />}</ListItemIcon>
                    <ListItemText primary={"Logout"} />
                  </ListItem>
                </List>
              ) : (
                <List>
                  {customerlists.map((customerlist) => (
                    <ListItem
                      button
                      key={customerlist.name}
                      onClick={() => navigate(customerlist.path)}
                    >
                      <ListItemIcon>{customerlist.icon}</ListItemIcon>
                      <ListItemText primary={customerlist.name} />
                    </ListItem>
                  ))}
                  {/* Logout Nav */}
                  <ListItem button onClick={logoutUserSubmit}>
                    <ListItemIcon>{<FcUnlock size={30} />}</ListItemIcon>
                    <ListItemText primary={"Logout"} />
                  </ListItem>
                </List>
              )}
            </Drawer>
          </Box>
        </div>
      )}

      {user ? (
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
      ) : (
        <Box
          component={"main"}
          sx={{
            flexGrow: 1,
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
};

export default Layout;
