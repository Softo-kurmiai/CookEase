import Stack from "@mui/material/Stack";
import { SmallRecipeCard } from "../../../MainComponents/SmallRecipeCard";
import Typography from "@mui/material/Typography";

export function SimilarRecipes() {
  return (
    <Stack justifyContent="center" alignItems="center" sx={{mt: "1.5rem"}} spacing={2}>
      <Typography
        variant="h6"
        component="h6"
        sx={{
          fontWeight: "600",
        }}
      >
        Redommended for you:
      </Typography>
      <SmallRecipeCard />
      <SmallRecipeCard />
      <SmallRecipeCard />
    </Stack>
  );
}

export default SimilarRecipes;
