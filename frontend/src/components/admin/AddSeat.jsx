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

const AddSeat = ({
  theaters,
  groups,
  seat,
  setSeat,
  onChangeSeats,
  onSubmitSeats,
  isLoadingSeats,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined">
        Create Seat
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
              Create seat
            </Typography>
            <form onSubmit={(e) => onSubmitSeats(e)}>
              <TextField
                fullWidth
                margin="normal"
                name="name"
                type="text"
                label="Seat Name"
                size="small"
                value={seat.name}
                onChange={(e) => onChangeSeats(e)}
              />
              <TextField
                fullWidth
                margin="normal"
                name="seats"
                type="text"
                label="Number of Seats"
                size="small"
                value={seat.seats}
                onChange={(e) => onChangeSeats(e)}
              />
              {/* Theater Dropdown */}
              <FormControl size="small" required fullWidth margin="normal">
                <InputLabel id="demo-simple-select-required-label">
                  Theaters
                </InputLabel>
                <Select
                  name="theater"
                  size="small"
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={seat.theater}
                  label="Age *"
                  onChange={(e) => onChangeSeats(e)}
                >
                  {theaters.map((theater) => (
                    <MenuItem key={theater._id} value={theater._id}>
                      {theater.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Group Dropdown */}
              <FormControl size="small" required fullWidth margin="normal">
                <InputLabel id="demo-simple-select-required-label">
                  Groups
                </InputLabel>
                <Select
                  name="groups"
                  size="small"
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={seat.groups}
                  label="Age *"
                  onChange={(e) => onChangeSeats(e)}
                >
                  {groups.map((group) => (
                    <MenuItem key={group._id} value={group._id}>
                      {group.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                disabled={isLoadingSeats ? true : false}
                type="submit"
                variant="contained"
                style={{ float: "right", mt: 10 }}
              >
                {isLoadingSeats ? "Creating" : "Create"}
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AddSeat;
