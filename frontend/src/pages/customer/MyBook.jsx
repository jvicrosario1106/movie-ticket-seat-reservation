import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FiTrash2 } from "react-icons/fi";
import Snackbars from "../../utilities/Snackbars";

import { userBook } from "../../slice/bookSlice";
import moment from "moment";

const User = () => {
  const dispatch = useDispatch();

  const { books } = useSelector((state) => state.bookReducer);
  useEffect(() => {
    dispatch(userBook());
  }, []);

  const columns = [
    {
      field: "movie",
      headerName: "Movie",
      width: 150,
      valueGetter: (params) => params.row.movie.title,
    },
    {
      field: "seats",
      headerName: "Seat",
      width: 150,
      valueGetter: (params) => params.row.seats.name,
    },

    {
      field: "theater",
      headerName: "Theater",
      width: 160,
      valueGetter: (params) => params.row.theater.name,
    },

    {
      field: "time",
      headerName: "Time",

      width: 160,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 160,
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      sortable: false,
      width: 160,
      flex: 1,
      type: "dateTime",
      valueGetter: ({ value }) => value && moment(value).format("YYYY-MM-DD"),
    },
    {
      headerName: "Actions",
      field: "actions",
      type: "actions",
      width: 300,

      getActions: (params) => [
        <Button
          startIcon={<FiTrash2 />}
          color="error"
          variant="contained"
          onClick={() => deleteUserSubmit(params.id)}
        >
          Cancel
        </Button>,
      ],
    },
  ];

  return (
    <div>
      <Typography
        sx={{
          mb: 3,
          background: "white",
          width: "25%",
          p: 1,
          fontWeight: "bold",
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: 3,
          textAlign: "center",
        }}
        variant="h4"
      >
        Your Booking
      </Typography>
      <div
        style={{
          height: 500,
          width: "100%",
          background: "white",
        }}
      >
        <DataGrid
          getRowId={(row) => row._id}
          style={{ fontSize: 15 }}
          rows={books}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
};

export default User;
