import React from "react";
import { loginUser } from "../slice/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);
  const loginSuccess = () => {
    dispatch(loginUser({ email: "jv@gmail.com", password: "123" }));
  };
  return (
    <div>
      Login - {user}
      <button onClick={loginSuccess}>Login</button>
    </div>
  );
};

export default Login;
