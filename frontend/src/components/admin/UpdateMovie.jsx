import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import FileBase64 from "react-file-base64";
import moment from "moment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const UpdateMovie = ({
  movie,
  movieOnChange,
  setMovieUpdate,
  setMovie,
  updateMovieSubmit,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setMovieUpdate();
  };

  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        Edit
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Update movie
            </Typography>
            <form onSubmit={(e) => updateMovieSubmit(e)}>
              <TextField
                value={movie.title}
                fullWidth
                margin="normal"
                name="title"
                type="text"
                label="Title Movie"
                size="small"
                onChange={(e) => movieOnChange(e)}
              />
              <Box
                sx={{
                  "& .MuiTextField-root": {
                    width: "25ch",
                  },
                }}
              >
                <TextField
                  value={movie.hours}
                  margin="normal"
                  name="hours"
                  type="number"
                  label="Hours"
                  size="small"
                  sx={{ mr: 1 }}
                  onChange={(e) => movieOnChange(e)}
                />
                <TextField
                  value={movie.minutes}
                  margin="normal"
                  name="minutes"
                  type="number"
                  label="Mins"
                  size="small"
                  onChange={(e) => movieOnChange(e)}
                />
                <TextField
                  value={moment(movie.start).format("YYYY-MM-DD")}
                  margin="normal"
                  name="start"
                  type="date"
                  label="Start Date"
                  size="small"
                  sx={{ mr: 1 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => movieOnChange(e)}
                />
                <TextField
                  value={moment(movie.end).format("YYYY-MM-DD")}
                  margin="normal"
                  name="end"
                  type="date"
                  label="End Date"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => movieOnChange(e)}
                />
              </Box>

              <TextField
                value={movie.description}
                fullWidth
                margin="normal"
                name="description"
                type="text"
                multiline
                rows={4}
                label="Movie Description"
                size="small"
                onChange={(e) => movieOnChange(e)}
              />
              <TextField
                value={movie.url}
                fullWidth
                margin="normal"
                name="url"
                type="text"
                label="Movie Trailer ( URL )"
                size="small"
                onChange={(e) => movieOnChange(e)}
              />

              <Typography variant="body2">Upload Movie Poster</Typography>
              <FileBase64
                multilple={false}
                onDone={({ base64 }) => setMovie({ ...movie, image: base64 })}
              />

              <Typography align="right">
                <Button type="submit">Save</Button>
              </Typography>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default UpdateMovie;
