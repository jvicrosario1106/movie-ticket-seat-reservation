import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FiTrash2 } from "react-icons/fi";
import {
  getTheaters,
  createTheater,
  deleteTheater,
} from "../../slice/theaterSlice";
import { getGroups, createGroup, deleteGroup } from "../../slice/groupSlice";

import Snackbars from "../../utilities/Snackbars";
import AddTheater from "../../components/admin/AddTheater";
import AddGroup from "../../components/admin/AddGroup";

const Theater = () => {
  const dispatch = useDispatch();
  const { theaters, isDeleted, isCreated } = useSelector(
    (state) => state.theaterReducer
  );

  const {
    groups,
    isCreated: isCreatedGroup,
    isDelete: isDeleteGroup,
  } = useSelector((state) => state.groupReducer);

  const [theater, setTheater] = useState({
    name: "",
  });

  const [group, setGroup] = useState({
    name: "",
  });

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
          startIcon={<FiTrash2 />}
          color="error"
          variant="contained"
          onClick={() => submitDeleteTheater(params.id)}
        >
          Delete
        </Button>,
      ],
    },
  ];

  const groupColumns = [
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
          startIcon={<FiTrash2 />}
          color="error"
          variant="contained"
          onClick={() => submitDeleteGroup(params.id)}
        >
          Delete
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

      <AddGroup submitGroup={submitGroup} setGroup={setGroup} group={group} />
      <div
        style={{
          height: 300,
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

      <AddTheater
        theater={theater}
        setTheater={setTheater}
        submitTheater={submitTheater}
      />
      <div
        style={{
          height: 500,
          width: "40%",
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
    </div>
  );
};

export default Theater;
