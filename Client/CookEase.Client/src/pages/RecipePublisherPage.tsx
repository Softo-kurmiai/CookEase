import ResponsiveMenuBar from "../components/MainComponents/ResponsiveMenuBar";
import ProfileDisplay from "../components/HelperComponents/ProfilePage/ProfileDisplay";
import Bubu from "../images/Bubu.jpg";
import Stack from "@mui/material/Stack";
import ShareButton from "../components/MainComponents/Miscellaneous/ShareButton";
import FollowButton from "../components/MainComponents/Miscellaneous/FollowButton";
import Typography from "@mui/material/Typography";
import RecipesDisplay from "../components/HelperComponents/MyRecipes/RecipesDisplay";
import { useAuth } from "../utils/AuthContext";

export function RecipePublisherPage() {
  const profileToDisplay = {
    Name: "Bubu",
    Followers: 2,
    Following: 52,
    Image: Bubu,
  };

  const { user, isAuthenticated } = useAuth();

  return (
    <>
      <ResponsiveMenuBar isAuthenticated={isAuthenticated} user={user} ></ResponsiveMenuBar>
      <ProfileDisplay profileDisplayProps={profileToDisplay}></ProfileDisplay>
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
        <FollowButton />
      </Stack>
      <Stack justifyContent="center" alignItems="center" spacing={2}>
        <Typography variant="h6" align="center" sx={{ fontWeight: 600}}>
          {profileToDisplay.Name} created recipes
        </Typography>
        <RecipesDisplay isEditable={false}/>
      </Stack>
    </>
  );
}

export default RecipePublisherPage;
