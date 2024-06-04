import ResponsiveMenuBar from "../components/MainComponents/ResponsiveMenuBar";
import HorizontalStepper from "../components/HelperComponents/CreateRecipe/HorizontalStepper";
import Typography from '@mui/material/Typography';
import { useAuth } from "../utils/AuthContext";
import { useParams } from "react-router-dom";


export function EditRecipePage() {
  const { user, isAuthenticated } = useAuth();
  const { id } = useParams<{ id: string }>();
  
  const recipeIdNumber = id ? parseInt(id) : undefined;

  return (
    <>
      <ResponsiveMenuBar user={user} isAuthenticated={isAuthenticated}></ResponsiveMenuBar>
      <Typography
        gutterBottom
        variant="h4"
        component="h4"
        sx={{
          fontWeight: "700",
          textAlign: "left",
          pl:"5rem",
          mt:"2.5rem",
          mb:"2.5rem"
        }}
      >
        Recipe edit
      </Typography>
      <HorizontalStepper recipeId={recipeIdNumber}/>
    </>
  );
}

export default EditRecipePage;
