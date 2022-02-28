import React from 'react'
import {useNavigate} from "react-router-dom"

const Login = ({setLogin}) => {
    const navigate = useNavigate()
    const loginSuccess = () =>{
        setLogin(true)
        navigate("/dashboard")
    }
  return (
    <div>Login
    <button onClick={loginSuccess}>Login</button>
    </div>
  )
}

export default Login