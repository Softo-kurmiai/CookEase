import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import EditProfileButton from "./EditProfileButton";
import Gabubu from "../../../../images/Gabubu.jpg";
import Avatar from "@mui/material/Avatar";
import GreenButton from "../../../MainComponents/Miscellaneous/GreenButton";
import DeleteAccountSection from "./DeleteAccountSection";
import ChangePasswordSection from "./ChangePasswordSection";

export function EditProfileDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditButtonCliked = () => {
    console.log("Edit button clicked!");
  };

  const handleSubmitButtonClicked = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //TODO: add form handling code
    //const formData = new FormData(event.currentTarget);
    //const formJson = Object.fromEntries(formData.entries());
    //const email = formJson.email;
    //console.log(email);
    handleClose();
  };

  return (
    <React.Fragment>
      <EditProfileButton onClick={handleClickOpen}></EditProfileButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmitButtonClicked,
        }}
      >
        <DialogTitle>
          <Typography
            gutterBottom
            variant="h4"
            component="h4"
            sx={{ margin: "0rem 2rem 1rem 2rem" }}
          >
            Edit my profile:
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ margin: "0rem 2rem 1rem 2rem" }}>
          <Stack spacing={3}>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="flex-start"
              alignItems="center"
              sx={{
                bm: "2rem",
              }}
            >
              <Avatar
                src={Gabubu}
                alt="Your profile picture"
                sx={{
                  width: "80px",
                  height: "80px",
                }}
              ></Avatar>
              <GreenButton
                onClick={handleEditButtonCliked}
                sx={{ height: "50px" }}
              >
                Edit
              </GreenButton>
            </Stack>
            <ChangePasswordSection />
            <DeleteAccountSection />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{ fontWeight: 600, color: "#000000" }}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            sx={{ fontWeight: 600 }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default EditProfileDialog;
