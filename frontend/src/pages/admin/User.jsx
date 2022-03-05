import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";

const User = () => {
  const columns = [
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,

      renderCell: (params) => <Button>{params.row.id}</Button>,
    },

    {
      field: "fullName",
      headerName: "Address",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,

      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },

    {
      field: "mobilenumber",
      headerName: "Mobile Number",
      description: "Tst sortable.",
      sortable: false,
      width: 160,
    },
    {
      field: "email",
      headerName: "Email Address",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      flex: 1,
    },
    {
      headerName: "Actions",
      field: "actions",
      type: "actions",
      width: 300,

      getActions: (params) => [
        <Button onClick={() => window.confirm("Edit")}>Edit</Button>,
        <Button>Delete</Button>,
      ],
    },
  ];
  const rows = [
    {
      id: 1,
      lastName: "Snow",
      firstName: "Jon",
      age: 35,
      mobilenumber: 123123,
      email: "jv@gmail.com",
    },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
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
          style={{ fontSize: 15 }}
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
};

export default User;
