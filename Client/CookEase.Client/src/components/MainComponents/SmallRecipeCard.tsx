import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CustomizedRating from "../HelperComponents/RecipeCard/StyledRating";
import SaladPicture from "../../images/salad.jpg"
import InfoBar from "../HelperComponents/RecipeCard/InfoBar";

export function SmallRecipeCard() {
  return (
    <Card
      sx={{ display: "flex", padding: 2, borderRadius: "16px", width:"100%", maxHeight:'130px' }}
    >
        <CardMedia
        image={
          SaladPicture
        }
        sx={{
          minWidth: "25%",
          maxWidth: "25%",
          flexShrink: 0,
          backgroundColor: "grey.200",
          borderRadius: "12px",
          boxShadow: "0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9",
        }}
      />
      <CardContent sx={{ pr: 2}}>
        <Box mb={1}>
          <Box
            component="h3"
            sx={{
              fontSize: 17,
              fontWeight: "bold",
              letterSpacing: "0.5px",
              marginBottom: 0,
              marginRight: 1.5,
              display: "inline-block",
            }}
          >
            Neapolitan Style Pizza{" "}
          </Box>
          <CustomizedRating
          readOnly={true}
          value={3.5}
          precision={0.5} />
          
        </Box>
        <Box
          component="p"
          sx={{ fontSize: 14, color: "grey.500", mb: "1.275rem" }}
        >
          <InfoBar author="By Gabubu" viewCount={1328} likeCount={120} commentCount={15} />
        </Box>
      </CardContent>
    </Card>
  );
}
