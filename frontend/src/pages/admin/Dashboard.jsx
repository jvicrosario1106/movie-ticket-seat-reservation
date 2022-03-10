import React, { useEffect } from "react";
import { Grid, Typography, Paper, CircularProgress, Chip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getReports } from "../../slice/reportSlice";
import { DataGrid } from "@mui/x-data-grid";
import HomePage from "../../images/homepage.jpg";
import ComingSoon from "../customer/ComingSoon";
import PieChart from "../../charts/PieChart";
import Doughnuts from "../../charts/Doughnuts";
import moment from "moment";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const { reports } = useSelector((state) => state.reportReducer);

  const showing = useSelector(
    (state) =>
      state.reportReducer.reports &&
      state.reportReducer.reports.movies.filter(
        (movie) => movie.status === "Showing"
      ).length
  );
  const coming = useSelector(
    (state) =>
      state.reportReducer.reports &&
      state.reportReducer.reports.movies.filter(
        (movie) => movie.status === "Coming Soon"
      ).length
  );
  const ended = useSelector(
    (state) =>
      state.reportReducer.reports &&
      state.reportReducer.reports.movies.filter(
        (movie) => movie.status === "Ended"
      ).length
  );

  const column = [
    {
      field: "title",
      headerName: "Newly Added Movie",
      width: 230,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={`${params.row.status}`}
          color={
            params.row.status == "Showing"
              ? "success"
              : params.row.status == "Coming Soon"
              ? "warning"
              : "error"
          }
          sx={{ mb: 1 }}
        />
      ),
    },
    {
      headerName: "Duration",
      width: 200,
      valueGetter: (params) =>
        `${params.row.hours} hours & ${params.row.minutes} minutes`,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 150,
      type: "dateTime",
      valueGetter: ({ value }) => value && moment(value).format("YYYY-MM-DD"),
    },
  ];

  useEffect(() => {
    dispatch(getReports());
  }, [dispatch]);

  console.log(reports);

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
            <Typography variant="h2" color="white" fontWeight={"bold"}>
              Dashboard
            </Typography>
            <Typography variant="body1" style={{ opacity: 0.6 }} color="white">
              Cinephile Summary
            </Typography>
          </div>

          {reports ? (
            <div>
              <Grid container spacing={2} sx={{ mt: 1.5 }}>
                <Grid item sm={12} md={7} lg={8}>
                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                      background: "white",
                      borderRadius: 10,
                    }}
                  >
                    <DataGrid
                      getRowId={(row) => row._id}
                      style={{ fontSize: 15 }}
                      rows={reports.movies}
                      columns={column}
                      pageSize={10}
                      rowsPerPageOptions={[5]}
                    />
                  </div>
                </Grid>
                <Grid item sm={12} md={5} lg={4}>
                  <Paper style={{ width: "100%", borderRadius: 10 }}>
                    <Typography fontWeight={"bold"}>Movie Status</Typography>
                    <Doughnuts
                      coming={coming}
                      showing={showing}
                      ended={ended}
                    />
                  </Paper>
                </Grid>
                {/* <Grid item lg={3}>
                  <Paper style={{ width: "100%", padding: 10 }}>
                    <PieChart />
                  </Paper>
                </Grid> */}
              </Grid>
            </div>
          ) : (
            <div
              style={{
                height: "55vh",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
