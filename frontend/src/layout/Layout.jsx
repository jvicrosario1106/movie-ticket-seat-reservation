import React from "react";
import {AppBar, Drawer, Toolbar, Typography,Box, List, ListItem,ListItemIcon,ListItemText, Divider} from "@mui/material"
import { useState } from "react";
import {FcBarChart,FcSettings,FcCalendar,FcClapperboard,FcUnlock} from "react-icons/fc"

const Layout = ({ children }) => {

  const [drawerOpen, setDrawerOpen] = useState(true)
  const drawerWidth = 240;

  const lists = [
    {
      name:"Dashboard",
      path:"/dashbord",
      icon:<FcBarChart size={30}/>
    },
    {
      name:"Movies",
      path:"/movies",
      icon:<FcClapperboard size={30}/>
    },
    {
      name:"Booking",
      path:"/bookings",
      icon:<FcCalendar size={30}/>
    },
    {
      name:"Theater Settings",
      path:"/theaters",
      icon:<FcSettings size={30}/>
    },
    {
      name:"Logout",
      path:"/",
      icon:<FcUnlock size={30}/>
    }
    
  ]
  
    return (
    <div style={{display:"flex"}}>
      <AppBar sx={{width: `calc(100% - ${drawerWidth}px)`}}>
        <Toolbar>
          <Typography variant="h5">Hello, Welcome!</Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      <Drawer sx={{'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },}} variant="permanent" open={true}>
        <Typography sx={{p:"20px", textAlign:"center"}} variant="h5">Cinephile</Typography>
        <Divider/>
        <List>
          {lists.map(list =>(
            <ListItem button key={list.path} onClick={()=>console.log(list.name)}>
              <ListItemIcon>{list.icon}</ListItemIcon>
              <ListItemText primary={list.name}/>
            </ListItem>
          ))}
        </List>
      </Drawer>
      </Box>


      <Box component={"main"} sx={{ flexGrow:1,sm:{width: `calc(100% - ${drawerWidth}px)`}}}><Toolbar/>{children}</Box>

    </div>
  );
};

export default Layout;
