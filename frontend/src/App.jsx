import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import {Button, Typography,Container, TextField} from "@mui/material"

function App() {
  const [count, setCount] = useState(0)

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
