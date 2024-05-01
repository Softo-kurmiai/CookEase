import Typography from "@mui/material/Typography";
import ResponsiveMenuBar from "../components/MainComponents/ResponsiveMenuBar";
import HorizontalStepper from "../components/HelperComponents/CreateRecipe/HorizontalStepper";

export function CreateRecipePage() {
  return (
    <>
      <ResponsiveMenuBar isAuthenticated={true}></ResponsiveMenuBar>
      <Typography
        gutterBottom
        variant="h4"
        component="h4"
        sx={{
          fontWeight: "700",
        }}
      >
        Submit a recipe to CookEase!
      </Typography>
      <HorizontalStepper/>
    </>
  );
}

export default CreateRecipePage;
