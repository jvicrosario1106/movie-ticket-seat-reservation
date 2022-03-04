import React from "react";
import Doughnuts from "../../charts/Doughnuts";
import { Grid } from "@mui/material";

const Dashboard = () => {
  return (
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
  );
};

export default Dashboard;
