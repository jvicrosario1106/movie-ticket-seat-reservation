import React, { useState, useEffect } from "react";
import { registerUser } from "../slice/registerSlice";
import { useDispatch, useSelector } from "react-redux";
import { Paper, TextField, Typography, Box, Button } from "@mui/material";
import Snackbars from "../utilities/Snackbars";
import RegisterBackground from "../images/registerbackground.jpg";
import RegisterBackgroundTwo from "../images/register.png";

const Register = () => {
  const dispatch = useDispatch();
  const { isSuccess, isFailed, Message, isLoading } = useSelector(
    (state) => state.registerReducer
  );
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    address: "",
    mobilenumber: "",
    type: "customer",
  });

  const onChangeData = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const loginSuccess = (e) => {
    e.preventDefault();
    dispatch(registerUser(userInfo));
    setUserInfo({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      address: "",
      mobilenumber: "",
      type: "customer",
    });
  };

  return (
    <div>
      {isSuccess && (
        <Snackbars
          message={"You Successfully Registered"}
          type="success"
          open={true}
        />
      )}

      {isFailed && <Snackbars message={Message} type="error" open={true} />}

      <Box
        sx={{
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          backgroundImage: `linear-gradient( rgba(0, 0, 0,0.3) 100%, rgba(0, 0, 0,0.3)100%), url(${RegisterBackground})`,
          backgroundSize: "cover",
        }}
      >
        <Paper sx={{ width: 400, p: 3 }}>
          <Typography textAlign="center">
            <img src={RegisterBackgroundTwo} width="50%" />
          </Typography>
          <Typography textAlign={"center"} variant="h5" fontWeight={"bold"}>
            Create an Account
          </Typography>

          <form onSubmit={loginSuccess}>
            <TextField
              value={userInfo.email}
              required
              sx={{ mt: 1 }}
              size="small"
              fullWidth
              label="Email"
              type="email"
              name="email"
              onChange={(e) => onChangeData(e)}
            />
            <TextField
              value={userInfo.password}
              required
              sx={{ mt: 1 }}
              size="small"
              fullWidth
              label="Password"
              type="password"
              name="password"
              onChange={(e) => onChangeData(e)}
            />
            <TextField
              value={userInfo.firstname}
              required
              sx={{ mt: 1 }}
              size="small"
              fullWidth
              label="First Name"
              type="text"
              name="firstname"
              onChange={(e) => onChangeData(e)}
            />
            <TextField
              value={userInfo.lastname}
              required
              sx={{ mt: 1 }}
              size="small"
              fullWidth
              label="Last Name"
              type="text"
              name="lastname"
              onChange={(e) => onChangeData(e)}
            />
            <TextField
              value={userInfo.mobilenumber}
              required
              sx={{ mt: 1 }}
              size="small"
              fullWidth
              label="Mobile Number"
              type="text"
              name="mobilenumber"
              onChange={(e) => onChangeData(e)}
            />
            <TextField
              value={userInfo.address}
              required
              sx={{ mt: 1 }}
              size="small"
              fullWidth
              label="Address"
              type="text"
              name="address"
              onChange={(e) => onChangeData(e)}
            />
            <Button
              disabled={isLoading ? true : false}
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 3 }}
              fullWidth
            >
              {isLoading ? "Registering account" : "Register Now"}
            </Button>
            <span>Go Back to? </span>
            <a href="/">Log in</a>
          </form>
        </Paper>
      </Box>
    </div>
  );
};

export default Register;
