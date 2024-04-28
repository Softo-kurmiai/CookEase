import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CustomizedRating from "../../../HelperComponents/RecipeCard/StyledRating";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Gabubu from "../../../../images/Gabubu.jpg";
import Avatar from "@mui/material/Avatar";
import { ThumbUp } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2";

interface Comment {
  id: number;
  author: string;
  date: string;
  rating: number;
  content: string;
  likes: number;
}

interface CommentCardProps {
  comment: Comment;
}

export function CommentCard({comment} : CommentCardProps) {
  return (
    <Card
      sx={{
        display: "flex",
        padding: 2,
        borderRadius: "16px",
        width: "95%",
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
                {comment.author}
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
                {comment.date}
              </Typography>
            </Grid>
          </Grid>
          <CustomizedRating readOnly={true} value={comment.rating} precision={0.5} />
          <Typography variant="body1">
            {comment.content}
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
              {comment.likes} people found this helpful
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default CommentCard;
