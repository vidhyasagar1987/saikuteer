import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import styled from "@mui/material/styles/styled";
import { Button } from "@/components/ui/button";
import CloseIcon from "@mui/icons-material/Close";

function PopUpModal({ open, handleClose, children, title }) {
  const DialogTitleCustom = styled(DialogTitle)(({ theme }) => ({
    background: "#8C67F2",
    color: "#fff",
    fontSize: "1.25rem",
    borderBottom: "1px solid #E0E0E0",
    position: "relative",
    padding: theme.spacing(2),
  }));

  const CloseButton = styled(IconButton)(({ theme }) => ({
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "#fff",
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
      <DialogTitleCustom>
        {title}{" "}
        <CloseButton onClick={handleClose}>
          <CloseIcon />
        </CloseButton>
      </DialogTitleCustom>

      <DialogContent>{children}</DialogContent>
      {/* <DialogActions>
        <Button onClick={handleClose} color="primary" variant="outline">
          Close
        </Button>
      </DialogActions> */}
    </Dialog>
  );
}

export default PopUpModal;
