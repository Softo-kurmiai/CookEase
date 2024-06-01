import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState, useEffect } from "react";
import { showToastError } from "../../../../utils/Notifications/toastUtils";
import CustomToastContainer from "../../../../utils/Notifications/CustomToastContainer";
import { Recipe } from "../../../../interfaces/Interfaces";
import { SmallRecipeCard } from "../../../MainComponents/SmallRecipeCard";

export function SimilarRecipes() {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const amountOfRecipes = 3;

  useEffect(() => {
    async function getRecipes() {
      try {
        const response = await axios.get<Recipe[]>(
          `/api/recipes/random?maxNumberOfRecipes=${amountOfRecipes}`
        );
        setRecipes(response.data);
      } catch (error) {
        console.error(error);
        showToastError(`Could not retrieve random recipes`);
        setRecipes(null);
      }
    }
    getRecipes();
  }, []);

  return (
    <Stack justifyContent="center" alignItems="center" spacing={2}>
      <CustomToastContainer />
      <Typography
        variant="h6"
        component="h6"
        sx={{
          fontWeight: "600",
        }}
      >
        Similar recipes:
      </Typography>
      {recipes && recipes.map((recipe, index) => (
        <SmallRecipeCard key={index} recipe={recipe} />
      ))}
    </Stack>
  );
}

export default SimilarRecipes;

