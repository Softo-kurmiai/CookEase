import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CustomizedRating from "../../../HelperComponents/RecipeCard/StyledRating";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Gabubu from "../../../../images/Gabubu.jpg";
import Avatar from "@mui/material/Avatar";
import { ThumbUp } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2";

export function CommentCard() {
  return (
    <Card
      sx={{
        display: "flex",
        padding: 2,
        borderRadius: "16px",
        width: "45%",
      }}
    >
      <CardContent sx={{ pr: 2, width:"100%" }}>
        <Stack>
          <Grid container spacing={2} columns={16}>
            <Grid xs={2}>
              <Avatar
                alt="Your profile picture"
                src={Gabubu}
                sx={{ width: "3rem", height: "3rem" }}
              />
            </Grid>
            <Grid xs={8}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  textDecoration: "underline",
                }}
              >
                Gabubu
              </Typography>
            </Grid>
            <Grid xs={6}>
              <Typography
                variant="body1"
                sx={{
                    color: "info.main",
                    textAlign: "right"
                }}
              >
                2024-04-28
              </Typography>
            </Grid>
          </Grid>
          <CustomizedRating readOnly={true} value={3.5} precision={0.5} />
          <Typography variant="body1">
            I made this and my mom was proud of me! 10/10 would recommended.
          </Typography>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}
            sx={{
              pt: "0.5rem",
            }}
          >
            <ThumbUp sx={{ color: "info.main" }} />
            <Typography
              variant="body2"
              sx={{
                textDecoration: "underline",
                color: "info.main",
              }}
            >
              2 people found this helpful
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default CommentCard;
