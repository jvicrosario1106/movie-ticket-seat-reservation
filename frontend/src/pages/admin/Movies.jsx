import React, { useState } from "react";
import AddMovie from "../../components/admin/AddMovie";

const Movies = (props) => {
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
    console.log(movie);
  };

  return (
    <div>
      <AddMovie
        movieOnChange={movieOnChange}
        setMovie={setMovie}
        movie={movie}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Movies;
