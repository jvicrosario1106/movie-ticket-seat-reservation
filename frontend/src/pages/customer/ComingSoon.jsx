import React, { useEffect } from "react";
import { getMovies } from "../../slice/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomePage from "../../images/homepage.jpg";
import Advance from "../../images/advance.svg";
import Cloud from "../../images/cloud.svg";
import Speed from "../../images/speed.svg";

const ComingSoon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const comingSoon = useSelector((state) => state.movieReducer.movies);

  useEffect(() => {
    dispatch(getMovies());
  }, []);

  return (
    <div>
      <div
        style={{
          backgroundImage: `linear-gradient( rgba(0, 0, 0,0.6) 100%, rgba(0, 0, 0,0.6)100%),url(${HomePage})`,
          backgroundSize: "cover",
          height: "60vh",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          borderRadius: 10,
        }}
      >
        <Typography variant="h2" fontWeight={"bold"} color="white">
          Welcome to Cinephile!
        </Typography>
        <Typography
          variant="body1"
          color="white"
          sx={{
            opacity: 0.6,
          }}
        >
          Home of the great movies of our time
        </Typography>
        <Button sx={{ mt: 5 }} variant="contained">
          About Us
        </Button>
      </div>

      <div>
        <Typography
          mt={3}
          sx={{ opacity: 0.6 }}
          variant="h4"
          fontWeight={"bold"}
        >
          Coming Soon
        </Typography>

        {comingSoon.length > 0 && (
          <Grid container sx={{ mt: 5 }} spacing={1}>
            {comingSoon.map((movie) => (
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
                  style={{ borderRadius: "6px" }}
                />
                <Typography align="center">{movie.title}</Typography>
              </Grid>
            ))}
          </Grid>
        )}
      </div>

      <div>
        <Typography
          mt={10}
          sx={{ opacity: 0.6 }}
          variant="h4"
          fontWeight={"bold"}
        >
          What is Cinephile?
        </Typography>
        <Typography textAlign={"justify"} mt={3}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus facilis officia voluptate impedit? Perspiciatis,
          dolorum. Harum repellat a deleniti beatae facilis non veritatis,
          eligendi quisquam fuga animi reiciendis cupiditate libero. Nostrum
          iusto omnis nam cumque excepturi, possimus ab sapiente, rem nulla
          voluptate sunt voluptates! Impedit cupiditate unde cumque qui.
          Voluptas accusantium laudantium libero commodi repudiandae! Blanditiis
          quaerat laborum quos ut!
        </Typography>

        <Typography
          textAlign="center"
          mt={9}
          mb={9}
          variant="h5"
          fontWeight={"bold"}
        >
          Features of Cinephile
        </Typography>

        <Grid
          container
          spacing={2}
          alignItems="center"
          sx={{ textAlign: "center" }}
        >
          <Grid item lg={4}>
            <img src={`${Advance}`} width="50%" />
            <Typography fontWeight={"bold"}>Tech Stack</Typography>
            <Typography mt={1}>
              This Application used a popular Teck stack consist of Programming
              languages, frameworks and tools to build softwares. React.js is
              used for frontend, Node.js of Backend, MongoDB for Database and
              Vite for running the development fast and smoothly
            </Typography>
          </Grid>
          <Grid item lg={4}>
            <img src={`${Cloud}`} width="50%" />
            <Typography fontWeight={"bold"}>Cloud Hosting</Typography>
            <Typography mt={1}>
              This Application used a popular Teck stack consist of Programming
              languages, frameworks and tools to build softwares. React.js is
              used for frontend, Node.js of Backend, MongoDB for Database and
              Vite for running the development fast and smoothly
            </Typography>
          </Grid>
          <Grid item lg={4}>
            <img src={`${Speed}`} width="50%" />
            <Typography fontWeight={"bold"}>Performance</Typography>
            <Typography mt={1}>
              This Application used a popular Teck stack consist of Programming
              languages, frameworks and tools to build softwares. React.js is
              used for frontend, Node.js of Backend, MongoDB for Database and
              Vite for running the development fast and smoothly
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ComingSoon;
