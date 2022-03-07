import React from "react";
import Doughnuts from "../../charts/Doughnuts";
import { Grid } from "@mui/material";
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
          Dashboard
          <Grid container spacing={3}>
            <Grid item lg={4}>
              <Doughnuts />
            </Grid>
            <Grid item lg={4}>
              <Doughnuts />
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
