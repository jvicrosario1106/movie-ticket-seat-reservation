import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../../slice/userSlice";
import { FiTrash2 } from "react-icons/fi";
import UpdateUser from "../../components/admin/UpdateUser";
import { updateUser } from "../../slice/userSlice";
import Snackbars from "../../utilities/Snackbars";

const User = () => {
  const dispatch = useDispatch();
  const {
    user,
    isLoading,
    isSuccess,
    isFailed,
    isMessage,
    isDeleted,
    isUpdated,
  } = useSelector((state) => state.userReducer);
  const [users, setUsers] = useState({});

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const onChangeData = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };

  const deleteUserSubmit = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirm) {
      dispatch(deleteUser(id));
    }
  };

  const updateUserSubmit = (id) => {
    const getuser = user.length > 0 && user.find((users) => users._id === id);
    setUsers(getuser);
  };

  const submitUpdateUser = (e) => {
    e.preventDefault();
    dispatch(updateUser(users));
    setUsers({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      address: "",
      mobilenumber: "",
      type: "customer",
    });
  };

  const columns = [
    {
      field: "firstname",
      headerName: "First name",
      width: 150,
    },
    {
      field: "lastname",
      headerName: "Last name",
      width: 150,
    },

    {
      field: "address",
      headerName: "Address",
      width: 160,
    },

    {
      field: "mobilenumber",
      headerName: "Mobile Number",
      description: "Tst sortable.",
      width: 160,
    },
    {
      field: "email",
      headerName: "Email Address",
      width: 160,
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Email Address",
      sortable: false,
      width: 160,
      flex: 1,
      type: "dateTime",
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      headerName: "Actions",
      field: "actions",
      type: "actions",
      width: 300,

      getActions: (params) => [
        <UpdateUser
          updateUserSubmit={updateUserSubmit}
          id={params.id}
          users={users}
          onChangeData={onChangeData}
          submitUpdateUser={submitUpdateUser}
          isLoading={isLoading}
        />,
        <Button
          startIcon={<FiTrash2 />}
          color="error"
          variant="contained"
          onClick={() => deleteUserSubmit(params.id)}
        >
          Delete
        </Button>,
      ],
    },
  ];

  return (
    <div>
      {isUpdated && (
        <Snackbars
          message={"Successfully Updated"}
          type={"success"}
          open={true}
        />
      )}

      {isUpdated === false && (
        <Snackbars message={isMessage} type={"error"} open={true} />
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
        Cinephile Users
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
          rows={user}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
};

export default User;
