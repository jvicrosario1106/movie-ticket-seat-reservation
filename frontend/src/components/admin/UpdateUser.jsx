import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { FiEdit2 } from "react-icons/fi";

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

const UpdateUser = ({
  updateUserSubmit,
  id,
  users,
  onChangeData,
  submitUpdateUser,
  isLoading,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    updateUserSubmit(id);
  };

  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button
        startIcon={<FiEdit2 />}
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
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{ mb: 3 }}
            >
              Update {users.email}
            </Typography>
            <form onSubmit={(e) => submitUpdateUser(e)}>
              <TextField
                value={users.email}
                required
                sx={{ mt: 1 }}
                size="small"
                fullWidth
                label="Email"
                type="email"
                name="email"
                onChange={(e) => onChangeData(e)}
              />

              <TextField
                value={users.firstname}
                required
                sx={{ mt: 1 }}
                size="small"
                fullWidth
                label="First Name"
                type="text"
                name="firstname"
                onChange={(e) => onChangeData(e)}
              />
              <TextField
                value={users.lastname}
                required
                sx={{ mt: 1 }}
                size="small"
                fullWidth
                label="Last Name"
                type="text"
                name="lastname"
                onChange={(e) => onChangeData(e)}
              />
              <TextField
                value={users.mobilenumber}
                required
                sx={{ mt: 1 }}
                size="small"
                fullWidth
                label="Mobile Number"
                type="text"
                name="mobilenumber"
                onChange={(e) => onChangeData(e)}
              />
              <TextField
                value={users.address}
                required
                sx={{ mt: 1 }}
                size="small"
                fullWidth
                label="Address"
                type="text"
                name="address"
                onChange={(e) => onChangeData(e)}
              />
              <Button
                disabled={isLoading ? true : false}
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 3 }}
                fullWidth
              >
                {isLoading ? "Updating" : "Update"}
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default UpdateUser;
