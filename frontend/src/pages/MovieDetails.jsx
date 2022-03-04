import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMovie, updateMovie, deleteMovie } from "../slice/movieSlice";
import { useNavigate } from "react-router-dom";
import {
  Rating,
  CircularProgress,
  Grid,
  Typography,
  Button,
  Box,
} from "@mui/material";
import ReactPlayer from "react-player/youtube";
import UpdateMovie from "../components/admin/UpdateMovie";

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movies, isLoading, isSuccess } = useSelector(
    (state) => state.movieReducer
  );
  const [rating, setRating] = useState(0);
  const [ratingResponse, setRatingResponse] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    dispatch(getMovie(id));
  }, [dispatch]);

  //Get Movie with the ID for Edit
  const setMovieUpdate = () => {
    setMovie(movies);
  };

  //Delete Movie
  const deleteMovieSubmit = () => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      dispatch(deleteMovie(id));
      navigate("/movies");
    }
  };

  //Update Movie
  const updateMovieSubmit = (e) => {
    e.preventDefault();
    dispatch(updateMovie(movie));
  };

  //Changing Ratings
  const changeRating = (newValue) => {
    setRating(newValue);
    setRatingResponse(true);
  };

  const movieOnChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography variant="h3" sx={{ fontWeight: "bold" }}>
        {movies.title}
      </Typography>
      <Typography sx={{ opacity: 0.6 }}>
        {movies.hours} hrs and {movies.minutes} minutes
      </Typography>

      <Box sx={{ display: "flex", float: "right" }}>
        <UpdateMovie
          movie={movie}
          movieOnChange={movieOnChange}
          setMovieUpdate={setMovieUpdate}
          setMovie={setMovie}
          updateMovieSubmit={updateMovieSubmit}
        />
        <Button variant="contained" onClick={deleteMovieSubmit} sx={{ ml: 1 }}>
          Delete
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ mt: 3, mb: 3 }}>
        <Grid item sm={12} md={10} lg={6}>
          <ReactPlayer
            playing={true}
            light={true}
            controls={true}
            width={600}
            url={`${movies.url}`}
          />
        </Grid>
        <Grid item sm={12} md={10} lg={6}>
          <img src={movies.image} width="100%" />
        </Grid>
      </Grid>
      <Rating
        value={rating}
        precision={0.5}
        size="large"
        onChange={(event, newValue) => changeRating(newValue)}
      />
      {ratingResponse ? (
        <Typography>Thank you for {rating} ratings!</Typography>
      ) : (
        <Typography>Rate this movie</Typography>
      )}

      <Typography sx={{ mt: 3 }}>Description</Typography>
      <Typography>{movies.description}</Typography>
    </div>
  );
};

export default MovieDetails;
