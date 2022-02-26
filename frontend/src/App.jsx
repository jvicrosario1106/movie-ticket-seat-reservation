import { useState,useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import {Button, Typography,Container, TextField} from "@mui/material"
import axios from "axios"

function App() {
  const [count, setCount] = useState(0)

  const getTheaters = () => {

    axios.get("http://localhost:8080/api/theaters").then((res)=>console.log(res.statusText)).catch(err=>console.log(err))

  }

  useEffect(() => {
    
    getTheaters()

  }, []);

  return (
    <div>
      <Container>
        <TextField size="small" placeholder="Enter your company" label="Company name"/>
        <Typography>Hello</Typography>
        <Button variant="contained" size="small" onClick={()=>{setCount(count+1)}}>Submit</Button>
        <Typography>{count}</Typography>
        <Button variant="contained" size="small" onClick={()=>{setCount(0)}}>Clear</Button>
      </Container>
    </div>
  )
}

export default App
