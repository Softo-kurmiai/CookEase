import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditButton from "./EditButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import DeleteButton from "./DeleteButton";

export default function EditRecipeFormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const collectionVariables = {
    name: "My lunch recipes",
    description:
      "This is the best lunch recipe collection ever which has a lot of dinner recipes.",
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
      <EditButton onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>
          <Typography gutterBottom variant="h4" component="h4">
            Edit collection: My lunch recipes
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ margin: "0rem 2rem 1rem 2rem"}}>
          <Stack>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="collection name"
              label="Edit collection name"
              type="text"
              fullWidth
              placeholder={collectionVariables.name}
              sx={{
                width: "50%",
                "& .MuiInput-underline:before": {
                  borderBottomColor: "primary.main", // Default underline color when not focused
                },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottomColor: "primary.main", // Hover underline color when not focused
                },
              }}
            />
            <TextField
              margin="dense"
              id="description"
              name="collection description"
              label="Edit collection description"
              type="text"
              fullWidth
              multiline
              placeholder={collectionVariables.description}
              sx={{
                width: "95%",
                "& .MuiInput-underline:before": {
                  borderBottomColor: "primary.main", // Default underline color when not focused
                },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottomColor: "primary.main", // Hover underline color when not focused
                },
              }}
            />
          </Stack>
          <Grid container spacing={2} sx={{ pt:"3.5rem"}}>
            <Grid xs={10}>
                <Stack>
                <Typography variant="body1" component="h6" sx={{ fontWeight: 600}}>
                Delete this collection?
              </Typography>
              <Typography variant="body2" component="h6" sx={{color: "info.main"}}>
              If you delete this collection - it will not be available to recover.
              </Typography>
                </Stack>
            </Grid>
            <Grid xs={2}>
              <DeleteButton/>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{fontWeight: 600, color: "#000000"}}>Cancel</Button>
          <Button type="submit" sx={{fontWeight: 600}}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
