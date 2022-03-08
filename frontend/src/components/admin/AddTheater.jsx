import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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

const AddTheater = ({ theater, setTheater, submitTheater, isLoading }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{ width: "40%" }}>
      <Button onClick={handleOpen} variant="outlined">
        Create Theater
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
              Create Theater
            </Typography>
            <form onSubmit={(e) => submitTheater(e)}>
              <TextField
                fullWidth
                value={theater.name}
                margin="normal"
                name="title"
                type="text"
                label="Theater Name"
                size="small"
                onChange={(e) =>
                  setTheater({ ...theater, name: e.target.value })
                }
              />
              <Button
                disabled={isLoading ? true : false}
                type="submit"
                variant="contained"
                style={{ float: "right" }}
              >
                {isLoading ? "Creating" : "Create"}
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AddTheater;
