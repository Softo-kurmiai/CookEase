import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CustomizedRating from "../HelperComponents/RecipeCard/StyledRating";
import InfoBar from "../HelperComponents/RecipeCard/InfoBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Recipe } from "../../interfaces/Interfaces"

export function SmallRecipeCard({ recipe }: { recipe : Recipe }) {
  const [authorName, setAuthorName] = useState("Placeholder");

  useEffect(() => {
    async function getAuthor(creatorId: number) {
      try {
        const response = await axios.get(`/api/users/${creatorId}`);
        setAuthorName(response.data.name);
      } catch (error) {
        console.error(error);
        setAuthorName("Placeholder");
      }
    }

    if (recipe.creatorId && recipe.creatorId !== 0) {
      getAuthor(recipe.creatorId);
    } else if (recipe.creatorId === 0) {
      setAuthorName("Placeholder");
    }
  }, [recipe.creatorId]);

  return (
    <Card
      sx={{ display: "flex", padding: 2, borderRadius: "16px", width: "100%", maxHeight: "130px" }}
    >
      <CardMedia
        image={recipe.image}
        sx={{
          minWidth: "25%",
          maxWidth: "25%",
          flexShrink: 0,
          backgroundColor: "grey.200",
          borderRadius: "12px",
          boxShadow: "0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9",
        }}
      />
      <CardContent sx={{ pr: 2 }}>
        <Box mb={1}>
          <Box
            component="h3"
            sx={{
              fontSize: 17,
              fontWeight: "bold",
              letterSpacing: "0.5px",
              marginBottom: 0,
              marginRight: 1.5,
              display: "inline-block",
            }}
          >
            {recipe.name}{" "}
          </Box>
          <CustomizedRating readOnly={true} value={recipe.rating} precision={0.5} />
        </Box>
        <Box component="p" sx={{ fontSize: 14, color: "grey.500", mb: "1.275rem" }}>
          <InfoBar
            author={authorName}
            viewCount={recipe.viewCount}
            likeCount={recipe.favoriteCount}
            commentCount={recipe.commentCount}
            creatorId={recipe.creatorId}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
