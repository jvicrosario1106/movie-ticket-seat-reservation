import { useState, useEffect } from "react";
import Layout from "./layout/Layout";
import Dashboard from "./pages/admin/Dashboard";
import Movies from "./pages/admin/Movies";
import Book from "./pages/admin/Book";
import Theater from "./pages/admin/Theater";
import User from "./pages/admin/User";
import Login from "./pages/Login";
import Notfound from "./pages/Notfound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const { isSuccess, user, isFailed } = useSelector(
    (state) => state.authReducer
  );
  console.log(import.meta.env.NAME);

  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route
              index
              element={isSuccess ? <Dashboard item={"hello"} /> : <Login />}
            />
            <Route path="/movies" element={<Movies item={"movies"} />} />
            <Route path="/bookings" element={<Book item={"movies"} />} />
            <Route path="/theaters" element={<Theater item={"movies"} />} />
            <Route path="/users" element={<User item={"movies"} />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
