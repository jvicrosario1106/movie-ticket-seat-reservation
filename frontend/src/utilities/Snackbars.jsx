import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Snackbars = ({ message, open, type }) => {
  const [opens, setOpens] = useState(open);

  return (
    <div>
      {/* <h1>Hello</h1> */}
      <Snackbar
        open={opens}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpens(false)}
          severity={type}
          sx={{ width: "100%" }}
        >
          {message}. {type === "error" && "Please try again"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Snackbars;
