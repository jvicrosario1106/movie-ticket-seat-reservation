import React, { useState, useEffect } from "react";
import { loginUser } from "../slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Paper, TextField, Typography, Box, Grid, Button } from "@mui/material";
import Snackbars from "../utilities/Snackbars";
import LoginBackground from "../images/loginbackground.jpg";
import LoginBackgroundTwo from "../images/login.png";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isSuccess, isFailed, isLoading } = useSelector(
    (state) => state.authReducer
  );
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const onChangeData = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const loginSuccess = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials));
  };

  return (
    <div>
      {isFailed && <Snackbars message={user} open={true} type="error" />}

      <Box
        sx={{
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          backgroundImage: `url(${LoginBackground})`,
          backgroundSize: "cover",
        }}
      >
        <Paper sx={{ width: 400, p: 3 }}>
          <Typography textAlign="center">
            <img src={LoginBackgroundTwo} width="50%" />
          </Typography>
          <Typography textAlign={"center"} variant="h5" fontWeight={"bold"}>
            Welcome to Cinephile
          </Typography>

          <form onSubmit={loginSuccess}>
            <TextField
              required
              size="small"
              margin="normal"
              fullWidth
              label="Email"
              type="email"
              name="email"
              onChange={(e) => onChangeData(e)}
            />
            <TextField
              required
              size="small"
              fullWidth
              label="Password"
              type="password"
              name="password"
              onChange={(e) => onChangeData(e)}
            />
            <Button
              disabled={isLoading ? true : false}
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 3 }}
              fullWidth
            >
              {isLoading ? "Logging In" : "Log in"}
            </Button>
            <span>Dont have account? </span>
            <Link to="register">Register Now</Link>
          </form>
        </Paper>
      </Box>
    </div>
  );
};

export default Login;
