import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert, CircularProgress } from "@mui/material";

export default function PositionedSnackbar({ snackState, setSnackState }) {
  const {
    vertical,
    horizontal,
    open,
    msg,
    severity,
    withCircularProgress,
  } = snackState;

  const initialSnackState = {
    open: false,
    msg: "default",
    severity: "error",
    vertical: "top",
    horizontal: "center",
    withCircularProgress: false,
  };

  const handleClose = () => {
    console.log("closing snack");
    setSnackState(initialSnackState);
  };

  return !withCircularProgress ? (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert severity={severity}>{msg}</Alert>
      </Snackbar>
    </div>
  ) : (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <CircularProgress />
      </Snackbar>
    </div>
  );
}
