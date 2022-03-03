import Layout from "./layout/Layout";
import Dashboard from "./pages/admin/Dashboard";
import Movies from "./pages/admin/Movies";
import Book from "./pages/admin/Book";
import Theater from "./pages/admin/Theater";
import User from "./pages/admin/User";
import Login from "./pages/Login";
import Notfound from "./pages/Notfound";
import MovieDetails from "./pages/MovieDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const { isSuccess } = useSelector((state) => state.authReducer);

  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route index element={isSuccess ? <Dashboard /> : <Login />} />
            <Route path="/movies">
              <Route index={true} element={<Movies />} />
              <Route path=":id" element={<MovieDetails />} />
            </Route>
            <Route path="/bookings" element={<Book />} />
            <Route path="/theaters" element={<Theater />} />
            <Route path="/users" element={<User />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
