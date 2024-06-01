import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import RedButton from "../../../MainComponents/Miscellaneous/RedButton"
import axios from "axios";
import { useAuth } from "../../../../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export function DeleteAccountSection() {
  const { user, handleLogout } = useAuth(); // Use the handleLogout function from AuthContext
  const navigate = useNavigate();

  const handleDeleteButtonClick = async () => {
    try {
      const response = await axios.delete('/api/users/' + user?.id);
      console.log('Response:', response.data);
      handleLogout();
      navigate('/', { state: { toastMessage: "User deleted successfully" } });
    } catch (error) {
      toast.error("Something bad happened during the request!");
      console.error('Error deleting user:', error);
    }
  }

  return (
    <>
      <ToastContainer/>
      <Grid container spacing={2} sx={{ pt: "1" }}>
          <Grid xs={10}>
            <Stack>
              <Typography
                variant="body1"
                component="h6"
                sx={{ fontWeight: 600, color:"secondary.main"}}
              >
                Delete account
              </Typography>
              <Typography
                variant="body2"
                component="h6"
                sx={{ color: "info.main" }}
              >
                Once you delete your account, there is no going back. Please be certain.
              </Typography>
            </Stack>
          </Grid>
          <Grid xs={2}>
              <RedButton onClick={handleDeleteButtonClick}>Delete</RedButton>
          </Grid>
        </Grid>
      </>
  );
}

export default DeleteAccountSection;