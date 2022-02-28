import { useState,useEffect } from 'react'
import Layout from "./layout/Layout"
import Dashboard from './pages/admin/Dashboard'
import Movies from './pages/admin/Movies'
import Book from './pages/admin/Book'
import Theater from './pages/admin/Theater'
import User from './pages/admin/User'
import Login from './pages/Login'
import {BrowserRouter, Route, Routes} from "react-router-dom"


function App() {
  const [login, setLogin] = useState(false)
  return (
    <div>

    {login ? <BrowserRouter>
     <Layout>
        <Routes>
          <Route path='/dashboard' element={<Dashboard item={"hello"}/>} />
          <Route path='/movies' element={<Movies item={"movies"}/>} />
          <Route path='/bookings' element={<Book item={"movies"}/>} />
          <Route path='/theaters' element={<Theater item={"movies"}/>} />
          <Route path='/users' element={<User item={"movies"}/>} />
        </Routes>
     </Layout>
     
     </BrowserRouter> : 
     
     <BrowserRouter>
        <Routes>
          <Route index element={<Login item={"movies"} setLogin={setLogin}/>} />
        </Routes> 
     </BrowserRouter>}


     
    </div>
  )
}

export default App
