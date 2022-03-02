import React, { useState, useEffect } from "react";
import AddMovie from "../../components/admin/AddMovie";
import { useDispatch, useSelector } from "react-redux";
import { postMovies, getMovies } from "../../slice/movieSlice";
import { Grid } from "@mui/material";

const Movies = (props) => {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.movieReducer);
  console.log(movies);
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
    dispatch(postMovies(movie));

    setMovie({
      title: "",
      hours: "",
      minutes: "",
      description: "",
      start: "",
      end: "",
      image: "",
      url: "",
    });
  };

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  return (
    <div>
      <AddMovie
        movieOnChange={movieOnChange}
        setMovie={setMovie}
        movie={movie}
        onSubmit={onSubmit}
      />
      {movies ? (
        <Grid container sx={{ background: "red", mt: 5 }} spacing={2}>
          {movies.map((movie) => (
            <Grid item md={3}>
              <img src={movie.image} width="100%" />
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>Add Movie</p>
      )}
    </div>
  );
};

export default Movies;
