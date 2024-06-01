import ResponsiveMenuBar from "../components/MainComponents/ResponsiveMenuBar";
import ProfileDisplay from "../components/HelperComponents/ProfilePage/ProfileDisplay";
import Stack from "@mui/material/Stack";
import ShareButton from "../components/MainComponents/Miscellaneous/ShareButton";
import FollowButton from "../components/MainComponents/Miscellaneous/FollowButton";
import Typography from "@mui/material/Typography";
import RecipesDisplay from "../components/HelperComponents/MyRecipes/RecipesDisplay";
import { useAuth } from "../utils/AuthContext";
import { useParams } from "react-router-dom";
import React from "react";
import axios from "axios";

export function RecipePublisherPage() {
  const { user, isAuthenticated } = useAuth();
  const { id } = useParams(); // CreatorId

  const [authorName, setAuthorName] = React.useState("Placeholder");
  const [profilePicture, setProfilePicture] = React.useState("");
  
  React.useEffect(() => {
    async function getAuthor(creatorId: number) {
      try {
        const response = await axios.get(`/api/users/${creatorId}`);
        setAuthorName(response.data.name);
        setProfilePicture(response.data.profilePicture)
      } catch (error) {
        console.error(error);
        setAuthorName("Placeholder");
        setProfilePicture("");
      }
    }
    
    const creatorId = Number(id);

    if (creatorId && creatorId !== 0) {
      getAuthor(creatorId);
    } else if (creatorId === 0){
      setAuthorName("Placeholder");
      setProfilePicture("");
    }
  }, [id]);

  const profileToDisplay = {
    Name: authorName,
    Followers: 0,
    Following: 0,
    Image: profilePicture,
  };

  return (
    <>
      <ResponsiveMenuBar user={user} isAuthenticated={isAuthenticated}></ResponsiveMenuBar>
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
        <RecipesDisplay isEditable={false} creatorId={Number(id)}/>
      </Stack>
    </>
  );
}

export default RecipePublisherPage;
