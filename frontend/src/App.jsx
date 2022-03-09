import Layout from "./layout/Layout";
import Dashboard from "./pages/admin/Dashboard";
import Movies from "./pages/admin/Movies";
import Book from "./pages/admin/Book";
import Theater from "./pages/admin/Theater";
import User from "./pages/admin/User";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notfound from "./pages/Notfound";
import MovieDetails from "./pages/MovieDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import BookNow from "./pages/customer/BookNow";
import MyBook from "./pages/customer/MyBook";

function App() {
  const { isSuccess } = useSelector((state) => state.authReducer);
  const users = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/register" element={<Register />} />

            <Route index element={users ? <Dashboard /> : <Login />} />
            <Route path="/bookings" element={<Book />} />
            <Route path="/theaters" element={<Theater />} />
            <Route path="/users" element={<User />} />
            <Route path="/movies">
              <Route index={true} element={<Movies />} />
              <Route path="/:id" element={<MovieDetails />} />
            </Route>

            <Route path="/booknow" element={<BookNow />} />
            <Route path="/mybook" element={<MyBook />} />

            <Route path="*" element={<Notfound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
