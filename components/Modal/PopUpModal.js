import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import styled from "@mui/material/styles/styled";
import { Button } from "@/components/ui/button";

function PopUpModal({ open, handleClose, children, title }) {
  const DialogTitleCustom = styled(DialogTitle)(() => ({
    background: "#8C67F2",
    color: "#fff",
    fontSize: "1.25rem",
    borderBottom: "1px solid #E0E0E0",
  }));
  return (
    <Dialog
      open={open}
      maxWidth="md"
      fullWidth
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          handleClose();
        }
      }}
    >
      <DialogTitleCustom>{title}</DialogTitleCustom>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="outline">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PopUpModal;
