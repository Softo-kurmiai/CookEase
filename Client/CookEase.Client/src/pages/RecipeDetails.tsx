import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import ResponsiveMenuBar from '../components/MainComponents/ResponsiveMenuBar';
import RecipeDetailCard from '../components/HelperComponents/RecipeDetailPage/RecipeCard/RecipeDetailCard';
import LeaveReviewCard from '../components/HelperComponents/RecipeDetailPage/Reviews/LeaveReviewCard';
import SimilarRecipes from '../components/HelperComponents/RecipeDetailPage/Reviews/SimilarRecipes';
import CommentSection from '../components/HelperComponents/RecipeDetailPage/Reviews/CommentSection';
import { RecipeData } from '../interfaces/RecipeDetailsInterfaces';
import { useAuth } from '../utils/AuthContext';
import { ToastContainer } from 'react-toastify';

export default function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const [recipeData, setRecipeData] = useState<RecipeData | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (id) {
      axios.get(`/api/recipes/${id}/full`)
        .then(response => {
          console.log(response);
          setRecipeData(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching recipe data:', error);
          setLoading(false);
        });
    }
  }, [id]);


  // Throws an error in UI so needs to be fixed (toast transfer from other component)
  // const location = useLocation();

  // useEffect(() => {
  //     if (location.state?.toastMessage) {
  //         toast.success(location.state.toastMessage);
  //         // Clear the state after displaying the message
  //         window.history.replaceState({}, document.title);
  //     }
  // }, [location.state]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const recipeIdNumber = id ? parseInt(id) : undefined;

  return (
    <>
      <ToastContainer/>
      <ResponsiveMenuBar user={user} isAuthenticated={isAuthenticated} />
      <Stack sx={{ padding: '2rem' }}>
        <Grid container spacing={2} columns={16}>
          <Grid xs={11}>
            <RecipeDetailCard recipeData={recipeData} />
          </Grid>
          <Grid xs={5}>
            <SimilarRecipes/>
          </Grid>
        </Grid>
        {recipeIdNumber !== undefined && (
          <>
            <LeaveReviewCard recipeId={recipeIdNumber} />
            <CommentSection recipeId={recipeIdNumber} user={user} isAuthenticated={isAuthenticated} />
          </>
        )}
      </Stack>
    </>
  );
}
