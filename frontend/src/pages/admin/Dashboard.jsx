import React from "react";
import Doughnuts from "../../charts/Doughnuts";
import { Grid, Typography, Paper } from "@mui/material";
import HomePage from "../../images/homepage.jpg";
import ComingSoon from "../customer/ComingSoon";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      {user.type === "customer" ? (
        <div>
          <ComingSoon />
        </div>
      ) : (
        <div>
          <div
            style={{
              backgroundImage: `linear-gradient( rgba(0, 0, 0,0.6) 100%, rgba(0, 0, 0,0.6)100%),url(${HomePage})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "30vh",
              borderRadius: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {" "}
            <Typography variant="h2" color="white" fontWeight={"bold"}>
              Dashboard
            </Typography>
            <Typography variant="body1" style={{ opacity: 0.6 }} color="white">
              Cinephile Summary
            </Typography>
          </div>

          <div>
            <Grid container spacing={1} sx={{ mt: 6 }}>
              <Grid item lg={4}>
                <Paper style={{ width: 300 }}>
                  <Doughnuts />
                </Paper>
              </Grid>
              <Grid item lg={4}>
                <Paper style={{ width: 300 }}>
                  <Doughnuts />
                </Paper>
              </Grid>
              <Grid item lg={4}>
                <Paper style={{ width: 300 }}>
                  <Doughnuts />
                </Paper>
              </Grid>
            </Grid>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
