import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FiEdit } from "react-icons/fi";
import { TextField } from "@mui/material";

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

const AddTheater = ({
  theaters,
  seats,
  movies,
  times,
  onChangeData,
  bookData,
  dates,
  changeMovie,
  movie,
  getValue,
  id,
  submitUpdatedData,
  isLoading,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    getValue(id);
  };
  const handleClose = () => setOpen(false);

  return (
    <div style={{ width: "40%" }}>
      <Button
        startIcon={<FiEdit />}
        onClick={handleOpen}
        variant="contained"
        color="warning"
      >
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
              Update Book
            </Typography>
            <form onSubmit={(e) => submitUpdatedData(e)}>
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

              <Button
                disabled={isLoading ? true : false}
                type="submit"
                variant="contained"
                style={{ float: "right" }}
              >
                {isLoading ? "Saving" : "Save"}
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AddTheater;
