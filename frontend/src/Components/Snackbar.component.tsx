import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Snackbarprops } from "../types/snackbar.type";

export default function SimpleSnackbar({ open, handleClose, message }:Snackbarprops) {
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={message}
      />
    </>
  );
}
