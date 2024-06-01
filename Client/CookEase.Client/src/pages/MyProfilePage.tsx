import ResponsiveMenuBar from "../components/MainComponents/ResponsiveMenuBar";
import ProfileDisplay from "../components/HelperComponents/ProfilePage/ProfileDisplay";
import ProfileTabPanel from "../components/HelperComponents/ProfilePage/ProfileTabPanel";
import ShareButton from "../components/MainComponents/Miscellaneous/ShareButton";
import EditProfileDialog from "../components/HelperComponents/ProfilePage/EditProfileDialog/EditProfileDialog";
import Stack from "@mui/material/Stack";
import { useAuth } from "../utils/AuthContext";
import { ToastContainer, toast } from "react-toastify";

export function MyProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const profileToDisplay = {
    Name: user?.name ?? "",
    Followers: 0,
    Following: 0,
    Image: user?.profilePicture ?? "",
  };

  const showToast = (message: string) => {
    toast.success(message, {
      autoClose: 5000,
    });
  };

  return (
    <>
      <ToastContainer/>
      <ResponsiveMenuBar user={user} isAuthenticated={isAuthenticated}></ResponsiveMenuBar>
      <ProfileDisplay profileDisplayProps={profileToDisplay} />
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{
          pb: "2rem",
        }}
      >
        <ShareButton />
        <EditProfileDialog editProfileProps={{name: profileToDisplay.Name, profilePicture: profileToDisplay.Image, showSuccessToast: showToast}} />
      </Stack>
      <ProfileTabPanel />
    </>
  );
}

export default MyProfilePage;