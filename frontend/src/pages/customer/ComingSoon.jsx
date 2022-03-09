import React, { useEffect } from "react";
import { getMovies } from "../../slice/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomePage from "../../images/homepage.jpg";
import Advance from "../../images/advance.svg";
import Cloud from "../../images/cloud.svg";
import Speed from "../../images/speed.svg";

const ComingSoon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const comingSoon = useSelector(
    (state) =>
      state.movieReducer.movies.length > 0 &&
      state.movieReducer.movies
        .filter((movie) => movie.status === "Coming Soon")
        .slice(0, 8)
  );

  useEffect(() => {
    dispatch(getMovies());
  }, []);

  return (
    <div>
      <div
        style={{
          backgroundImage: `linear-gradient( rgba(0, 0, 0,0.6) 100%, rgba(0, 0, 0,0.6)100%),url(${HomePage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
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
          Home of the great movies in our time
        </Typography>
        <a href="#image" style={{ textDecoration: "none" }}>
          <Button sx={{ mt: 5 }} variant="contained">
            About Us
          </Button>
        </a>
      </div>

      <div>
        <Typography
          mt={6}
          sx={{ opacity: 0.6 }}
          variant="h4"
          fontWeight={"bold"}
          textAlign="center"
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

      <Paper
        style={{
          background: "white",
          borderRadius: 10,
          padding: 50,
          marginTop: 60,
        }}
      >
        <Typography sx={{ opacity: 0.6 }} variant="h4" fontWeight={"bold"}>
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
          mt={3}
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
            <img id="image" src={`${Advance}`} width="50%" />
            <Typography fontWeight={"bold"}>Tech Stack</Typography>

            <Typography variant="body2" mt={1}>
              This Application used a popular Teck stack consist of In demand
              Programming languages, frameworks and tools to build softwares.
            </Typography>
          </Grid>
          <Grid item lg={4}>
            <img src={`${Cloud}`} width="50%" />
            <Typography fontWeight={"bold"}>Cloud Hosting</Typography>
            <Typography variant="body2" mt={1}>
              Hosted in Heroku and Vercel. It has a cloud database named MongoDB
              for the security and safety of data inside the application
            </Typography>
          </Grid>
          <Grid item lg={4}>
            <img src={`${Speed}`} width="50%" />
            <Typography fontWeight={"bold"}>Performance</Typography>
            <Typography variant="body2" mt={1}>
              Because of Vite, Reactjs and Express, navigating into multiples
              pages is faster because it aims to provide a smooth development
              experience
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ComingSoon;
