import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FiTrash2 } from "react-icons/fi";
import { getTheaters } from "../../slice/theaterSlice";
import { getSeats } from "../../slice/seatSlice";
import { getMovies } from "../../slice/movieSlice";
import UpdateBook from "../../components/admin/UpdateBook";
import { userBook, updateBook, deleteBook } from "../../slice/bookSlice";
import Snackbars from "../../utilities/Snackbars";
import moment from "moment";

const User = () => {
  const dispatch = useDispatch();

  const { books, isUpdated, isLoading, isDeleted } = useSelector(
    (state) => state.bookReducer
  );
  const { theaters } = useSelector((state) => state.theaterReducer);
  const { seats } = useSelector((state) => state.seatReducer);
  const { movies } = useSelector((state) => state.movieReducer);

  const times = [
    "9:25 AM",
    "11:50AM",
    "1:45PM",
    "3:15PM",
    "5:35PM",
    "7:15PM",
    "9:25PM",
  ];

  const [dates, setDates] = useState([]);
  const [movie, setMovie] = useState("");

  const [bookData, setBookData] = useState({
    theater: "",
    seats: "",
    quantity: "",
    date: "",
    time: "",
    user: "",
  });

  const getValue = (id) => {
    const getBook = books.length > 0 && books.find((book) => book._id === id);

    const getMovie =
      movies.length > 0 &&
      movies.find((movie) => movie._id === getBook.movie._id);

    const start = moment(getMovie.start);
    const end = moment(getMovie.end);

    const dateArray = new Array();
    const diff = end.diff(start, "days");

    for (var i = 0; i <= diff; i++) {
      const date = moment(start).add(i, "days").format("YYYY-MM-DD");
      dateArray.push(date);
      setDates(dateArray);
    }

    setMovie(getBook.movie === null ? "" : getBook.movie._id);
    setBookData({
      _id: id,
      theater: getBook.theater === null ? "" : getBook.theater._id,
      seats: getBook.seats === null ? "" : getBook.seats._id,
      quantity: getBook.quantity,
      date: moment(getBook.date).format("YYYY-MM-DD"),
      time: getBook.time,
      user: getBook.user._id,
    });
  };

  const submitUpdatedData = (e) => {
    e.preventDefault();

    const data = { ...bookData, movie };
    dispatch(updateBook(data));
  };

  const deleteBookSubmit = (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      dispatch(deleteBook(id));
    }
  };

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

  useEffect(() => {
    dispatch(userBook());
    dispatch(getTheaters());
    dispatch(getSeats());
    dispatch(getMovies());
  }, []);

  const columns = [
    {
      field: "movie",
      headerName: "Movie",
      width: 150,
      valueGetter: (params) =>
        params.row.movie === null ? "" : params.row.movie.title,
    },
    {
      field: "seats",
      headerName: "Seat",
      width: 150,
      valueGetter: (params) =>
        params.row.seats === null ? "" : params.row.seats.name,
    },

    {
      field: "theater",
      headerName: "Theater",
      width: 160,
      valueGetter: (params) =>
        params.row.theater === null ? "" : params.row.theater.name,
    },

    {
      field: "time",
      headerName: "Time",

      width: 160,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 160,
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      sortable: false,
      width: 160,
      flex: 1,
      type: "dateTime",
      valueGetter: ({ value }) => value && moment(value).format("YYYY-MM-DD"),
    },
    {
      headerName: "Actions",
      field: "actions",
      type: "actions",
      width: 300,

      getActions: (params) => [
        <UpdateBook
          theaters={theaters}
          seats={seats}
          movies={movies}
          times={times}
          onChangeData={onChangeData}
          bookData={bookData}
          dates={dates}
          changeMovie={changeMovie}
          movie={movie}
          getValue={getValue}
          id={params.id}
          submitUpdatedData={submitUpdatedData}
          isLoading={isLoading}
          date={params.row.date}
        />,
        // isLoading ||
        // moment(Date.now()).format("YYYY-MM-DD") >
        //   moment(params.row.date).format("YYYY-MM-DD")
        //   ? true
        //   : false
        <Button
          disabled={isLoading && true}
          startIcon={<FiTrash2 />}
          color="error"
          variant="contained"
          onClick={() => deleteBookSubmit(params.id)}
        >
          {isLoading ? "Canceled" : "Cancel"}
        </Button>,
      ],
    },
  ];

  return (
    <div>
      {isUpdated && (
        <Snackbars
          message={"Successfully Updated"}
          open={true}
          type={"success"}
        />
      )}

      {isDeleted && (
        <Snackbars
          message={"Successfully Cancelled"}
          open={true}
          type={"success"}
        />
      )}

      <Typography
        sx={{
          mb: 3,
          background: "white",
          width: "25%",
          p: 1,
          fontWeight: "bold",
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: 3,
          textAlign: "center",
        }}
        variant="h4"
      >
        Your Booking
      </Typography>
      <div
        style={{
          height: 500,
          width: "100%",
          background: "white",
        }}
      >
        <DataGrid
          getRowId={(row) => row._id}
          style={{ fontSize: 15 }}
          rows={books}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
};

export default User;
