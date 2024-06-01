import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import EditProfileButton from "./EditProfileButton";
import Avatar from "@mui/material/Avatar";
import Input from "@mui/material/Input";
import DeleteAccountSection from "./DeleteAccountSection";
import ChangePasswordSection from "./ChangePasswordSection";
import { handleFileChange } from "../../CreateRecipe/UploadFileUtils";
import { toast } from "react-toastify";
import { useAuth } from "../../../../utils/AuthContext";
import axios from "axios";
import { UserResponse } from "../../../../interfaces/Interfaces";

interface EditProfileProps {
  name: string;
  profilePicture: string | undefined;
  showSuccessToast: (message: string) => void;
}

export function EditProfileDialog({ editProfileProps }: { editProfileProps: EditProfileProps }) {
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState('');
  const [userResponse, setUserResponse] = React.useState<UserResponse | null>(null);
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [repeatNewPassword, setRepeatNewPassword] = React.useState('');

  const { user, setUser } = useAuth();

  const handleClickOpen = async () => {
    setOpen(true);

    try {
      const response = await axios.get('/api/users/' + user?.id);
      setUserResponse(response.data);
    } catch (error) {
      toast.error("Failed to get the current user!");
      console.error('Error while trying to get the current user in profile edit:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    handleReset();
  };

  const handleReset = () => {
    setImage('');
    setCurrentPassword('');
    setNewPassword('');
    setRepeatNewPassword('');
    setUserResponse(null);
  };

  const handleChangePictureButtonClicked = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(event);
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitButtonClicked = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newPassword !== repeatNewPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    if (image !== "" && userResponse != null) {
      userResponse.profilePicture = image;
    }

    if (currentPassword !== '' && newPassword !== '' && repeatNewPassword !== '') {
      try {
        const combinedData = {
          username: user?.name,
          password: currentPassword
        };
        await axios.post('/api/login', combinedData);
      } catch (error) {
        toast.error("Provided password is wrong!");
        console.error('Error while trying to login user in profile edit:', error);
        return;
      }

      userResponse!.password = newPassword;
    }

    try {
      const response = await axios.put('/api/users/' + user?.id, userResponse);
      const userData = response.data;

      setUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        profilePicture: userData.profilePicture
      });

      // editProfileProps.showSuccessToast('Successfully updated user profile information'); // For some reason it errors
    } catch (error) {
      toast.error("User update failed!");
      console.error('Error while trying to update user in profile edit:', error);
      return;
    }

    handleReset();
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
            Edit {editProfileProps.name} profile
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
                src={image === "" ? editProfileProps.profilePicture : image}
                alt="Your profile picture"
                sx={{
                  width: "80px",
                  height: "80px",
                }}
              ></Avatar>
              <Input
                type="file"
                onChange={handleChangePictureButtonClicked}
                style={{ display: "none" }}
                inputProps={{ accept: "image/*" }}
                id="upload-photo"
              />
              <label htmlFor="upload-photo">
                <Button
                  variant="outlined"
                  component="span"
                  sx={{
                    color: "secondary.main",
                    borderColor: "secondary.main",
                  }}
                >
                  Change profile picture
                </Button>
              </label>
            </Stack>
            <ChangePasswordSection
              currentPassword={currentPassword}
              setCurrentPassword={setCurrentPassword}
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              repeatNewPassword={repeatNewPassword}
              setRepeatNewPassword={setRepeatNewPassword}
            />
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