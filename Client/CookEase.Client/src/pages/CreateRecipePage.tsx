import ResponsiveMenuBar from "../components/MainComponents/ResponsiveMenuBar";
import HorizontalStepper from "../components/HelperComponents/CreateRecipe/HorizontalStepper";
import Typography from '@mui/material/Typography';
import { useAuth } from "../utils/AuthContext";


export function CreateRecipePage() {
  const { user, isAuthenticated } = useAuth();
  
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
        Submit a recipe to CookEase!
      </Typography>
      <HorizontalStepper/>
    </>
  );
}

export default CreateRecipePage;
