import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Salad from "../../images/salad.jpg";
import CustomizedRating from "../HelperComponents/RecipeCard/StyledRating";
import InfoTypography from "../HelperComponents/RecipeCard/InfoTypography";
import Stack from "@mui/material/Stack";
import { Schedule, ThumbUp, Group } from "@mui/icons-material";
import FavoriteButton from "../HelperComponents/RecipeCard/FavoriteButton";
import InfoBar from "../HelperComponents/RecipeCard/InfoBar";
import EditDialog from "../HelperComponents/MyRecipes/EditDialog"
import FancyTimeBlock from "../HelperComponents/RecipeCard/FancyTimeBlock"
import React from "react";
import axios from "axios";

export interface RecipeCardProps {
  recipeData?:{
    id: number;
    creatorId: number;
    name: string;
    description: string;
    rating: number;
    prepTime: number;
    cookTime: number;
    difficulty: string;
    servings: number;
    image: string;
    viewCount: number;
    commentCount: number;
    favoriteCount: number;
  },
  isFavorited: boolean;
  isEditable: boolean;
}

export function RecipeCard({
  recipeData = {
    id: 5,
    creatorId: 69,
    name: "Salad",
    description: "A short description of the recipe. So delicous nium nium what an amazing description",
    rating: 3.5,
    prepTime: 100,
    cookTime: 185,
    difficulty: "Easy",
    servings: 10,
    image: Salad,
    viewCount: 1000,
    commentCount: 10,
    favoriteCount: 100,
  },
  isFavorited = false,
  isEditable = false
}: RecipeCardProps) {

  const [authorName, setAuthorName] = React.useState("Gabubu");

  React.useEffect(() => {
    getAuthor(recipeData.creatorId);
  }, []);

  async function getAuthor(creatorId: number) {
    axios.get(`/api/users/${creatorId}`)
    .then(response => {
      console.log(response.data);
      setAuthorName(response.data.username);
    })
  };

  isEditable == null ? false : true;
  return (
    <Card
      sx={{
        maxWidth: 280,
        // minWidth: 280,
        margin: "auto",
        boxShadow: "0 0 20px 0 rgba(0,0,0,0.12)",
        position: "relative",
        transition: "0.3s",
      }}
    >
      <FavoriteButton
        sx={{
          position: "absolute",
          top: 100,
          right: 20,
          zIndex: 3,
          border: "2px solid #fff",
        }}
        isFavorited={isFavorited}
      />
      <CardMedia
        // image={recipeData.image}
        image={Salad}
        sx={{
          width: "100%",
          paddingBottom: "56.25%",
          backgroundColor: "rgba(0, 0, 0, 0.08)",
          position: "relative",
        }}
      />
      <CardContent sx={{ p: 3, position: "relative", zIndex: 2 }}>
        {" "}
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <CustomizedRating readOnly={true} value={recipeData.rating} precision={0.5} />
          {isEditable ? <EditDialog/> : null}
        </Stack>
        <InfoBar
          author={authorName}
          viewCount={recipeData.viewCount}
          likeCount={recipeData.favoriteCount}
          commentCount={recipeData.commentCount}
        />
        <Stack
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ pt: 3 }}
        >
          <Typography gutterBottom variant="h6" component="div">
            {recipeData.name}
          </Typography>
          <Typography gutterBottom variant="body2" component="div">
            {recipeData.description}
          </Typography>
        </Stack>
      </CardContent>
      <Stack
        direction="row"
        spacing={6}
        justifyContent="center"
        alignItems="center"
        sx={{ pb: 5 }}
      >
        <Stack>
          <Schedule sx={{ color: "info.main", ml: 1 }} />
          <InfoTypography>
            <FancyTimeBlock minutes={recipeData.cookTime + recipeData.prepTime}/>
          </InfoTypography>
        </Stack>
        <Stack>
          <ThumbUp sx={{ color: "info.main", ml: 0.5 }} />
          <InfoTypography><>{recipeData.difficulty}</></InfoTypography>
        </Stack>
        <Stack>
          <Group sx={{ color: "info.main" }}></Group>
          <InfoTypography>{recipeData.servings}</InfoTypography>
        </Stack>
      </Stack>
    </Card>
  );
}
