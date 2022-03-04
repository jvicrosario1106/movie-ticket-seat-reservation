import React, { useState, useEffect } from "react";
import AddMovie from "../../components/admin/AddMovie";
import { useDispatch, useSelector } from "react-redux";
import { postMovies, getMovies } from "../../slice/movieSlice";
import {
  Grid,
  CircularProgress,
  Typography,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Snackbars from "../../utilities/Snackbars";
import moment from "moment";

const Movies = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movies, isLoading, isSuccess, isFailed } = useSelector(
    (state) => state.movieReducer
  );

  const [movie, setMovie] = useState({
    title: "",
    hours: "",
    minutes: "",
    description: "",
    start: "",
    end: "",
    image: "",
    url: "",
  });

  const movieOnChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let status;

    if (movie.start > movie.end) {
      status = "Ended";
    } else if (
      movie.start === moment(Date.now()).format("YYYY-MM-DD") &&
      movie.end > movie.start
    ) {
      status = "Showing";
    } else {
      status = "Coming Soon";
    }

    const data = { ...movie, status };
    dispatch(postMovies(data));
  };

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div>
      {/* Snackbar message */}
      <Snackbars />

      <AddMovie
        movieOnChange={movieOnChange}
        setMovie={setMovie}
        movie={movie}
        onSubmit={onSubmit}
      />
      {movies.length > 0 ? (
        <Grid container sx={{ mt: 5 }} spacing={1}>
          {movies.map((movie) => (
            <Grid
              item
              lg={3}
              key={movie._id}
              sx={{
                "&:hover": {
                  filter: "grayscale(100%)",
                  cursor: "pointer",
                },
              }}
            >
              <img
                src={movie.image}
                onClick={() => navigate(`/movies/${movie._id}`)}
                width="100%"
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>Add Movie</Typography>
      )}
    </div>
  );
};

export default Movies;
