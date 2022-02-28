import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {createTheme, ThemeProvider} from "@mui/material/styles"
 
const theme = createTheme({
  palette:{
    primary:{
      main:"#ef5350"
    },
  }
})


ReactDOM.render(
  
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
)
