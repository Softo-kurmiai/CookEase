import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Salad from "../../images/salad.jpg";
import CustomizedRating from "../HelperComponents/RecipeCard/StyledRating";
import InfoTypography from "../HelperComponents/RecipeCard/InfoTypography";
import Stack from "@mui/material/Stack";
import { Schedule, ThumbUp, Group } from "@mui/icons-material";
import FavoriteButton from "../HelperComponents/RecipeCard/FavoriteButton";
import InfoBar from "../HelperComponents/RecipeCard/InfoBar";
import EditDialog from "../HelperComponents/MyRecipes/EditDialog"

interface RecipeCardProps {
  isFavorited: boolean;
  isEditable?: boolean;
}

export function RecipeCard({
  isFavorited = false,
  isEditable = false,
}: RecipeCardProps) {
  isEditable == null ? false : true;
  return (
    <Card
      sx={{
        maxWidth: 280,
        margin: "auto",
        boxShadow: "0 0 20px 0 rgba(0,0,0,0.12)",
        position: "relative",
        transition: "0.3s",
      }}
    >
      <FavoriteButton
        sx={{
          position: "absolute",
          top: 100,
          left: 220,
          zIndex: 1,
          border: "2px solid #fff",
        }}
        isFavorited={isFavorited}
      />
      <CardMedia
        image={Salad}
        sx={{
          width: "100%",
          paddingBottom: "56.25%",
          backgroundColor: "rgba(0, 0, 0, 0.08)",
          position: "relative",
        }}
      />
      <CardContent sx={{ p: 3, position: "relative", zIndex: 2 }}>
        {" "}
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <CustomizedRating readOnly={true} value={3.5} precision={0.5} />
          {isEditable ? <EditDialog/> : null}
        </Stack>
        <InfoBar
          author="Gabubu"
          viewCount={1328}
          likeCount={120}
          commentCount={15}
        />
        <Stack
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ pt: 3 }}
        >
          <Typography gutterBottom variant="h6" component="div">
            Recipe name
          </Typography>
          <Typography gutterBottom variant="body2" component="div">
            A short description of the recipe. So delicous nium nium what an
            amazing description
          </Typography>
        </Stack>
      </CardContent>
      <Stack
        direction="row"
        spacing={6}
        justifyContent="center"
        alignItems="center"
        sx={{ pb: 5 }}
      >
        <Stack>
          <Schedule sx={{ color: "info.main", ml: 1 }} />
          <InfoTypography>25 min.</InfoTypography>
        </Stack>
        <Stack>
          <ThumbUp sx={{ color: "info.main", ml: 0.5 }} />
          <InfoTypography>Easy</InfoTypography>
        </Stack>
        <Stack>
          <Group sx={{ color: "info.main" }}></Group>
          <InfoTypography>Easy</InfoTypography>
        </Stack>
      </Stack>
    </Card>
  );
}
