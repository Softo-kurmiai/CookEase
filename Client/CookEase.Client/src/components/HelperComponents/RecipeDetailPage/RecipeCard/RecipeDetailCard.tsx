import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import RecipeDetailCardHeader from "./RecipeDetailCardHeader";
import IngredientInfo from "./IngredientInfo";
import RecipeDetailInstructions from "./RecipeDetailInstructions";
import { RecipeData } from "../../../../interfaces/RecipeDetailsInterfaces";
import { Typography } from "@mui/material";

interface RecipeDetailCardProps {
  recipeData?: RecipeData;
}

export function RecipeDetailCard({ recipeData }: RecipeDetailCardProps) {
  return (
    <Paper elevation={3} sx={{ maxWidth: "95%", padding: "1rem" }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Paper
            style={{
              position: "relative",
              maxWidth: "100%",
              height: 0,
              paddingBottom: "100%", // Maintain aspect ratio
              overflow: "hidden", // Hide overflowing content
            }}
          >
            {recipeData == undefined ? (
              <></>
            ) : (
              <img
                src={recipeData.image}
                alt="recipe image"
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            )}
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <RecipeDetailCardHeader recipeData={recipeData} />
        </Grid>
        <Grid item xs={3}>
          {recipeData == undefined ? (
            <Typography variant="h5">No ingredient info available</Typography>
          ) : (
            <IngredientInfo
              portions={recipeData == undefined ? 1 : recipeData.servings}
              ingredients={recipeData.ingredients}
            />
          )}
        </Grid>
        <Grid item xs={9}>
          {recipeData == undefined ? (
            <Typography variant="h5">No instructions found</Typography>
          ) : (
            <RecipeDetailInstructions instructions={recipeData.instructions} />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default RecipeDetailCard;
