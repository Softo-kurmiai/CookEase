import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import { RecipeCard } from "../../MainComponents/RecipeCard";

import Pagination from "@mui/material/Pagination";
import { RecipeData } from "../../../interfaces/RecipeDetailsInterfaces";

interface SearchResultsProps {
  searchResults: RecipeData[];
}

export function SearchResults({searchResults} : SearchResultsProps) {
  
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
      {searchResults.length === 0 ? (
        <Typography variant="h5" gutterBottom fontWeight={700}>
          No recipes found
        </Typography>
      ) : (
        <>
          <Typography variant="h4" gutterBottom fontWeight={700}>
            {/*Todo: change with axios call to return the whole total recipe count*/}
            Total recipes found: {searchResults.length}
          </Typography>
          <Grid xs={8}>
            <Grid container spacing={1} sx={{ p: "1rem" }}>
              {searchResults.map((recipeData, index) => (
                <Grid key={index} xs={2}>
                  <RecipeCard recipeData={recipeData}></RecipeCard>
                </Grid>
              ))}
            </Grid>
          </Grid>
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
