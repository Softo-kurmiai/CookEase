import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import ResponsiveMenuBar from '../components/MainComponents/ResponsiveMenuBar';
import RecipeDetailCard from '../components/HelperComponents/RecipeDetailPage/RecipeCard/RecipeDetailCard';
import LeaveReviewCard from '../components/HelperComponents/RecipeDetailPage/Reviews/LeaveReviewCard';
import SimilarRecipes from '../components/HelperComponents/RecipeDetailPage/Reviews/SimilarRecipes';
import RecommendedRecipes from '../components/HelperComponents/RecipeDetailPage/Reviews/RecommendedRecipes';
import CommentSection from '../components/HelperComponents/RecipeDetailPage/Reviews/CommentSection';
import { RecipeData } from '../interfaces/RecipeDetailsInterfaces';

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState<RecipeData | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/recipes/${id}/full`)
      .then(response => {
        console.log(response)
        setRecipeData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching recipe data:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ResponsiveMenuBar isAuthenticated />
      <Stack sx={{ padding: '2rem' }}>
        <Grid container spacing={2} columns={16}>
          <Grid xs={11}>
            <RecipeDetailCard recipeData={recipeData} />
          </Grid>
          <Grid xs={5}>
            <SimilarRecipes />
            <RecommendedRecipes />
          </Grid>
        </Grid>
        <LeaveReviewCard />
        <CommentSection />
      </Stack>
    </>
  );
}
