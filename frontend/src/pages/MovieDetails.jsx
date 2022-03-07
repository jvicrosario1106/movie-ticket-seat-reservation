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
  Chip,
} from "@mui/material";
import ReactPlayer from "react-player/youtube";
import UpdateMovie from "../components/admin/UpdateMovie";
import moment from "moment";

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movies, isLoading, isSuccess } = useSelector(
    (state) => state.movieReducer
  );
  const [rating, setRating] = useState(0);
  const [ratingResponse, setRatingResponse] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
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
    dispatch(updateMovie(data));
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

      {user.type === "customer" && (
        <div>
          <Rating
            value={rating}
            precision={0.5}
            size="large"
            onChange={(event, newValue) => changeRating(newValue)}
            sx={{ mt: 1 }}
          />
          {ratingResponse ? (
            <Typography>Thank you for {rating} ratings!</Typography>
          ) : (
            <Typography>Rate this movie</Typography>
          )}
        </div>
      )}

      <Chip
        label={`${movies.status} - ${moment(movies.start).format(
          "MMM DD YYYY"
        )} to ${moment(movies.end).format("MMM DD YYYY")}`}
        color={
          movies.status == "Showing"
            ? "success"
            : movies.status == "Coming Soon"
            ? "warning"
            : "error"
        }
        sx={{ mt: 1 }}
      />

      {user.type === "admin" && (
        <Box sx={{ display: "flex", float: "right" }}>
          <UpdateMovie
            movie={movie}
            movieOnChange={movieOnChange}
            setMovieUpdate={setMovieUpdate}
            setMovie={setMovie}
            updateMovieSubmit={updateMovieSubmit}
          />
          <Button
            variant="contained"
            onClick={deleteMovieSubmit}
            sx={{ ml: 1 }}
          >
            Delete
          </Button>
        </Box>
      )}

      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          mt: 3,
        }}
      >
        <Grid item>
          <ReactPlayer
            playing={true}
            light={true}
            controls={true}
            width={600}
            url={`${movies.url}`}
          />
        </Grid>
        <Grid item>
          <img
            style={{ width: 260, height: 360 }}
            src={movies.image}
            width="100%"
          />
        </Grid>
      </Grid>

      <Box textAlign={"center"} mt={3}>
        <Typography variant="h4" fontWeight={"bold"}>
          Description
        </Typography>

        <Typography textAlign={"justify"}>{movies.description}</Typography>
      </Box>
    </div>
  );
};

export default MovieDetails;
