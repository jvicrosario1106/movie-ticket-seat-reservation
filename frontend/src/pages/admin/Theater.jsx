import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FiTrash2 } from "react-icons/fi";
import {
  getTheaters,
  createTheater,
  deleteTheater,
} from "../../slice/theaterSlice";
import { getGroups, createGroup, deleteGroup } from "../../slice/groupSlice";
import {
  getSeats,
  createSeats,
  deleteSeats,
  updateSeats,
} from "../../slice/seatSlice";

import Snackbars from "../../utilities/Snackbars";
import AddTheater from "../../components/admin/AddTheater";
import AddGroup from "../../components/admin/AddGroup";
import AddSeat from "../../components/admin/AddSeat";
import UpdateSeat from "../../components/admin/UpdateSeat";

const Theater = () => {
  const dispatch = useDispatch();

  const { theaters, isDeleted, isCreated, isLoading } = useSelector(
    (state) => state.theaterReducer
  );

  const {
    groups,
    isCreated: isCreatedGroup,
    isDelete: isDeleteGroup,
    isLoading: isLoadingGroup,
  } = useSelector((state) => state.groupReducer);

  const {
    seats,
    isCreated: isCreatedSeats,
    isDeleted: isDeletedSeats,
    isUpdated: isUpdatedSeats,
    isLoading: isLoadingSeats,
    isFailed: isFailedSeats,
  } = useSelector((state) => state.seatReducer);

  const [theater, setTheater] = useState({
    name: "",
  });

  const [group, setGroup] = useState({
    name: "",
  });

  const [seat, setSeat] = useState({
    name: "",
    theater: "",
    groups: "",
    seats: "",
  });

  const onSubmitSeats = (e) => {
    e.preventDefault();
    dispatch(createSeats(seat));

    setSeat({
      name: "",
      theater: "",
      groups: "",
      seats: "",
    });
  };

  const onSubmitUpdateSeats = (e) => {
    e.preventDefault();
    dispatch(updateSeats(seat));
    console.log(seat);
  };

  const onDeleteSeats = (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      dispatch(deleteSeats(id));
    }
  };

  const getSeatValue = (id) => {
    const seatValue = seats.length > 0 && seats.find((seat) => seat._id === id);
    setSeat({
      _id: seatValue._id,
      name: seatValue.name,
      theater: seatValue.theater === null ? "" : seatValue.theater._id,
      groups: seatValue.groups === null ? "" : seatValue.groups._id,
      seats: seatValue.seats,
    });
    console.log(seatValue);
  };

  const onChangeSeats = (e) => {
    setSeat({ ...seat, [e.target.name]: e.target.value });
  };

  const submitTheater = (e) => {
    e.preventDefault();
    dispatch(createTheater(theater));
    setTheater({
      name: "",
    });
  };

  const submitGroup = (e) => {
    e.preventDefault();
    dispatch(createGroup(group));
    setGroup({
      name: "",
    });
  };

  const submitDeleteTheater = (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      dispatch(deleteTheater(id));
    }
  };

  const submitDeleteGroup = (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      dispatch(deleteGroup(id));
    }
  };

  useEffect(() => {
    dispatch(getTheaters());
    dispatch(getGroups());
    dispatch(getSeats());
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "Theater ",
      width: 150,
    },
    {
      field: "createdAt",
      headerName: "Created at",
      width: 150,
    },

    {
      headerName: "Actions",
      field: "actions",
      type: "actions",
      width: 200,

      getActions: (params) => [
        <Button
          disabled={isLoading ? true : false}
          startIcon={<FiTrash2 />}
          color="error"
          variant="contained"
          onClick={() => submitDeleteTheater(params.id)}
        >
          {isLoading ? "Deleting" : "Delete"}
        </Button>,
      ],
    },
  ];

  const groupColumns = [
    {
      field: "name",
      headerName: "Group ",
      width: 150,
    },
    {
      field: "createdAt",
      headerName: "Created at",
      width: 150,
    },

    {
      headerName: "Actions",
      field: "actions",
      type: "actions",
      width: 200,

      getActions: (params) => [
        <Button
          disabled={isLoadingGroup ? true : false}
          startIcon={<FiTrash2 />}
          color="error"
          variant="contained"
          onClick={() => submitDeleteGroup(params.id)}
        >
          {isLoadingGroup ? "Deleting" : "Delete"}
        </Button>,
      ],
    },
  ];

  const seatColumns = [
    {
      field: "name",
      headerName: "Seat ",
      width: 150,
    },
    {
      field: "seats",
      headerName: "Seat # ",
      width: 150,
    },
    {
      field: "groups",
      headerName: "Group ",
      width: 150,
      valueGetter: (params) =>
        params.row.groups === null ? "" : params.row.groups.name,
    },
    {
      field: "theater",
      headerName: "Theater ",
      width: 150,
      valueGetter: (params) =>
        params.row.theater === null ? "" : params.row.theater.name,
    },
    {
      field: "createdAt",
      headerName: "Created at ",
      width: 150,
      flex: 1,
    },

    {
      headerName: "Actions",
      field: "actions",
      type: "actions",
      width: 400,

      getActions: (params) => [
        <UpdateSeat
          theaters={theaters}
          groups={groups}
          seat={seat}
          setSeat={setSeat}
          onChangeSeats={onChangeSeats}
          onSubmitSeats={onSubmitSeats}
          getSeatValue={getSeatValue}
          onSubmitUpdateSeats={onSubmitUpdateSeats}
          id={params.id}
          isLoadingSeats={isLoadingSeats}
        />,
        <Button
          disabled={isLoadingSeats ? true : false}
          startIcon={<FiTrash2 />}
          color="error"
          variant="contained"
          onClick={() => onDeleteSeats(params.id)}
        >
          {isLoadingSeats ? "Deleting" : "Delete"}
        </Button>,
      ],
    },
  ];

  return (
    <div>
      {isCreated && (
        <Snackbars
          message={"Successfully Created"}
          type={"success"}
          open={true}
        />
      )}

      {isDeleted && (
        <Snackbars
          message={"Successfully Deleted"}
          type={"success"}
          open={true}
        />
      )}

      {isCreatedGroup && (
        <Snackbars
          message={"Successfully Created"}
          type={"success"}
          open={true}
        />
      )}

      {isDeleteGroup && (
        <Snackbars
          message={"Successfully Deleted"}
          type={"success"}
          open={true}
        />
      )}

      {isCreatedSeats && (
        <Snackbars
          message={"Successfully Created"}
          type={"success"}
          open={true}
        />
      )}

      {isDeletedSeats && (
        <Snackbars
          message={"Successfully Deleted"}
          type={"success"}
          open={true}
        />
      )}

      {isUpdatedSeats && (
        <Snackbars
          message={"Successfully Updated"}
          type={"success"}
          open={true}
        />
      )}

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
        Cinephile Settings
      </Typography>

      {/* Seats */}

      <AddSeat
        theaters={theaters}
        groups={groups}
        seat={seat}
        setSeat={setSeat}
        onChangeSeats={onChangeSeats}
        onSubmitSeats={onSubmitSeats}
        isLoadingSeats={isLoadingSeats}
      />
      <div
        style={{
          height: 400,
          width: "100%",
          background: "white",
          marginTop: 5,
          marginBottom: 30,
        }}
      >
        <DataGrid
          getRowId={(row) => row._id}
          style={{ fontSize: 15 }}
          rows={seats}
          columns={seatColumns}
          pageSize={10}
          rowsPerPageOptions={[5]}
        />
      </div>

      <Grid container spacing={2}>
        <Grid item md={12} lg={6}>
          <AddTheater
            theater={theater}
            setTheater={setTheater}
            submitTheater={submitTheater}
            isLoading={isLoading}
          />
          <div
            style={{
              height: 500,
              width: "100%",
              background: "white",
              marginTop: 5,
            }}
          >
            <DataGrid
              getRowId={(row) => row._id}
              style={{ fontSize: 15 }}
              rows={theaters}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5]}
            />
          </div>
        </Grid>
        <Grid item md={12} lg={6}>
          <AddGroup
            submitGroup={submitGroup}
            setGroup={setGroup}
            group={group}
            isLoadingGroup={isLoadingGroup}
          />
          <div
            style={{
              height: 500,
              width: "100%",
              background: "white",
              marginTop: 5,
              marginBottom: 20,
            }}
          >
            <DataGrid
              getRowId={(row) => row._id}
              style={{ fontSize: 15 }}
              rows={groups}
              columns={groupColumns}
              pageSize={10}
              rowsPerPageOptions={[5]}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Theater;
