import React, { useEffect, useState } from "react";
import { Paper, Typography, TextField, Grid, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getTheaters } from "../../slice/theaterSlice";
import { getSeats } from "../../slice/seatSlice";
import { getMovies } from "../../slice/movieSlice";
import { createBook } from "../../slice/bookSlice";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import moment from "moment";
import Snackbars from "../../utilities/Snackbars";

const BookNow = () => {
  const dispatch = useDispatch();

  const { theaters } = useSelector((state) => state.theaterReducer);
  const { seats } = useSelector((state) => state.seatReducer);
  const { movies } = useSelector((state) => state.movieReducer);

  const { isCreated, isFailed, isLoading } = useSelector(
    (state) => state.bookReducer
  );

  const [dates, setDates] = useState([]);
  const [movie, setMovie] = useState("");

  const [bookData, setBookData] = useState({
    theater: "",
    seats: "",
    quantity: "",
    date: "",
    time: "",
  });

  const times = [
    "9:25 AM",
    "11:50AM",
    "1:45PM",
    "3:15PM",
    "5:35PM",
    "7:15PM",
    "9:25PM",
  ];

  const onChangeData = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const changeMovie = (e) => {
    setMovie(e.target.value);
    const getMovie =
      movies.length > 0 && movies.find((movie) => movie._id === e.target.value);

    const start = moment(getMovie.start);
    const end = moment(getMovie.end);

    const dateArray = new Array();
    const diff = end.diff(start, "days");

    for (var i = 0; i <= diff; i++) {
      const date = moment(start).add(i, "days").format("YYYY-MM-DD");
      dateArray.push(date);
      setDates(dateArray);
    }
  };

  const onSubmitBook = (e) => {
    e.preventDefault();
    const data = { ...bookData, movie };
    dispatch(createBook(data));
    setMovie("");
    setBookData({
      theater: "",
      seats: "",
      quantity: "",
      date: "",
      time: "",
    });
  };

  useEffect(() => {
    dispatch(getTheaters());
    dispatch(getSeats());
    dispatch(getMovies());
  }, [dispatch]);

  return (
    <div>
      {isCreated && (
        <Snackbars
          message={"Successfully Booked"}
          type={"success"}
          open={true}
        />
      )}

      {isFailed && (
        <Snackbars message={"Failed to Booked"} type={"error"} open={true} />
      )}

      <Typography variant="h4" fontWeight={"bold"}>
        What are you looking up to?
      </Typography>

      <Grid container spacing={5}>
        <Grid item lg={6}>
          <Paper sx={{ width: "100%", p: 2, mt: 3 }}>
            <Typography variant="h5" sx={{ opacity: 0.6 }}>
              Book Now
            </Typography>
            <form onSubmit={(e) => onSubmitBook(e)}>
              <FormControl size="small" required fullWidth margin="normal">
                <InputLabel id="demo-simple-select-required-label">
                  Movies
                </InputLabel>
                <Select
                  name="movie"
                  size="small"
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={movie}
                  label="Age *"
                  onChange={(e) => changeMovie(e)}
                >
                  {movies.length > 0 &&
                    movies.map((movie) => (
                      <MenuItem key={movie._id} value={movie._id}>
                        {movie.title}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <FormControl size="small" required fullWidth margin="normal">
                <InputLabel id="demo-simple-select-required-label">
                  Theaters
                </InputLabel>
                <Select
                  name="theater"
                  size="small"
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={bookData.theater}
                  label="Age *"
                  onChange={(e) => onChangeData(e)}
                >
                  {theaters.map((theater) => (
                    <MenuItem key={theater._id} value={theater._id}>
                      {theater.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" required fullWidth margin="normal">
                <InputLabel id="demo-simple-select-required-label">
                  Seats
                </InputLabel>
                <Select
                  name="seats"
                  size="small"
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={bookData.seats}
                  label="Age *"
                  onChange={(e) => onChangeData(e)}
                >
                  {seats.map((seat) => (
                    <MenuItem key={seat._id} value={seat._id}>
                      {seat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                margin="normal"
                size="small"
                fullWidth
                label="Quantity"
                type="number"
                name="quantity"
                value={bookData.quantity}
                onChange={(e) => onChangeData(e)}
              />

              <FormControl size="small" required fullWidth margin="normal">
                <InputLabel id="demo-simple-select-required-label">
                  Dates
                </InputLabel>
                <Select
                  name="date"
                  size="small"
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={bookData.date}
                  label="Age *"
                  onChange={(e) => onChangeData(e)}
                >
                  {dates.map((date) => (
                    <MenuItem key={date} value={date}>
                      {date}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" required fullWidth margin="normal">
                <InputLabel id="demo-simple-select-required-label">
                  Preferred Time
                </InputLabel>
                <Select
                  name="time"
                  size="small"
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={bookData.time}
                  label="Age *"
                  onChange={(e) => onChangeData(e)}
                >
                  {times.map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Typography align="right">
                <Button
                  type="submit"
                  disabled={isLoading ? true : false}
                  variant="contained"
                >
                  {isLoading ? "Submitting" : "Submit"}
                </Button>
              </Typography>
            </form>
          </Paper>
        </Grid>

        <Grid item lg={6}>
          {/* <Paper sx={{ width: "100%" }}> */}
          <ImageList sx={{ width: 500, height: 500 }} cols={3} rowHeight={300}>
            {movies.length > 0 &&
              movies.map((movie) => (
                <ImageListItem key={movie._id}>
                  <img src={movie.image} alt={movie.title} loading="lazy" />
                </ImageListItem>
              ))}
          </ImageList>
          {/* </Paper> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default BookNow;
