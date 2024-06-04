import * as React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import { RecipeCard } from "../../MainComponents/RecipeCard";
import axios from "axios";
import Pagination from "@mui/material/Pagination";

interface RecipeCategorySearchResultsProps {
  categoryName: string;
}

interface RecipeData {
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
}

export function RecipeCategorySearchResults({
  categoryName,
}: RecipeCategorySearchResultsProps) {
  const [categoryRecipes, setCategoryRecipes] = React.useState<RecipeData[]>(
    []
  );

  //TODO: change these hardcoded values and add pagination
  const recipesPerPage = 15;
  const page = 1;

  React.useEffect(() => {
    async function getCategoryRecipes(categoryName: string) {
      try {
        const response = await axios.get(
          `/api/recipes/category/${categoryName}?recipesPerPage=${recipesPerPage}&page=${page}`
        );
        setCategoryRecipes(response.data);
      } catch (error) {
        console.error(error);
        setCategoryRecipes([]); // Set to empty array in case of error
      }
    }
    getCategoryRecipes(categoryName);
  }, [categoryName, recipesPerPage, page]);

  return (
    <Stack
      sx={{
        textAlign: "center",
        pt: "2rem",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column", 
      }}
      spacing={2}
    >
      {categoryRecipes.length === 0 ? (
        <Typography variant="h5" gutterBottom fontWeight={700}>
          No recipes found
        </Typography>
      ) : (
        <>
          <Typography variant="h4" gutterBottom fontWeight={700}>
            {/*Todo: change with axios call to return the whole total recipe count*/}
            Total recipes found: {categoryRecipes.length}
          </Typography>
          <div style={{ display: 'flex' }}>
            <Stack spacing={2} sx={{ width: '100%' }} alignItems="center">
              <Stack direction="row" spacing={2}>
                {categoryRecipes.map((recipeData, index) => (
                  <Grid key={index} xs={3}>
                    <RecipeCard recipeData={recipeData}></RecipeCard>
                  </Grid>
                ))}
              </Stack>
            </Stack>
          </div>
        </>
      )}
      <Pagination
        count={10}
        page={1}
        color="primary"
        sx={{
          padding: "0.5rem",
        }}
      />
    </Stack>
  );
}
