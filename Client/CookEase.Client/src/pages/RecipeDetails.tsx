import Stack from "@mui/material/Stack";
import RecipeDetailCard from "../components/HelperComponents/RecipeDetailPage/RecipeCard/RecipeDetailCard";
import LeaveReviewCard from "../components/HelperComponents/RecipeDetailPage/Reviews/LeaveReviewCard";
import Grid from "@mui/material/Unstable_Grid2";
import ResponsiveMenuBar from "../components/MainComponents/ResponsiveMenuBar";
import SimilarRecipes from "../components/HelperComponents/RecipeDetailPage/Reviews/SimilarRecipes";
import RecommendedRecipes from "../components/HelperComponents/RecipeDetailPage/Reviews/RecommendedRecipes";
import CommentSection from "../components/HelperComponents/RecipeDetailPage/Reviews/CommentSection";

export default function RecipeDetails() {
  return (
    <>
      <ResponsiveMenuBar />
      <Stack
        sx={{
          padding: "2rem",
        }}
      >
        <Grid container spacing={2} columns={16}>
          <Grid xs={11}>
            <RecipeDetailCard></RecipeDetailCard>
          </Grid>
          <Grid xs={5}>
            <SimilarRecipes />
            <RecommendedRecipes />
          </Grid>
        </Grid>
        <LeaveReviewCard />
        <CommentSection></CommentSection>
      </Stack>
    </>
  );
}
