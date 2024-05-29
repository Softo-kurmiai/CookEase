import ResponsiveMenuBar from "../components/MainComponents/ResponsiveMenuBar";
import ProfileDisplay from "../components/HelperComponents/ProfilePage/ProfileDisplay";
import Gabubu from "./../images/Gabubu.jpg";
import ProfileTabPanel from "../components/HelperComponents/ProfilePage/ProfileTabPanel";
import ShareButton from "../components/MainComponents/Miscellaneous/ShareButton";
import EditProfileDialog from "../components/HelperComponents/ProfilePage/EditProfileDialog/EditProfileDialog";
import Stack from "@mui/material/Stack";
import { useAuth } from "../utils/AuthContext";

export function MyProfilePage() {
  const profileToDisplay = {
    Name: "Gabubu",
    Followers: 2,
    Following: 52,
    Image: Gabubu,
  };

  const { user, isAuthenticated } = useAuth();

  return (
    <>
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
        <EditProfileDialog />
      </Stack>
      <ProfileTabPanel />
    </>
  );
}

export default MyProfilePage;
