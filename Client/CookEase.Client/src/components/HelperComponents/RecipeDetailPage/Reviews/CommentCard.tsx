import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CustomizedRating from "../../../HelperComponents/RecipeCard/StyledRating";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Unstable_Grid2";
import { getAuthor, Author } from "../../../../utils/GetAuthorUtils.ts";
import React, { useState } from "react";
import CustomToastContainer from "../../../../utils/Notifications/CustomToastContainer.tsx"
import ThumbsUpComponent from "./CommentThumbsUp.tsx";
import { useAuth } from "../../../../utils/AuthContext.tsx";

interface Comment {
  id: number;
  userId: number;
  date: string;
  rating: number;
  content: string;
  likes: number;
  likeCount?: number | null;
}

interface CommentCardProps {
  comment: Comment;
}

export function CommentCard({ comment }: CommentCardProps) {

  const [author, setAuthor] = useState<Author | null>(null);
  const { user, isAuthenticated } = useAuth();

  React.useEffect(() => {
    async function fetchAuthor() {
      const fetchedAuthor = await getAuthor(comment.userId);
      setAuthor(fetchedAuthor);
    }

    if (comment.userId && comment.userId !== 0) {
      fetchAuthor();
    } else if (comment.userId === 0) {
      setAuthor(null);
    }
  }, [comment.userId, comment.id]);

  return (
    <Card
      sx={{
        display: "flex",
        padding: 2,
        borderRadius: "16px",
        width: "95%",
      }}
    >
      <CardContent sx={{ pr: 2, width: "100%" }}>
      <CustomToastContainer />
        <Stack>
          <Grid container spacing={2} columns={16}>
            <Grid xs={10}>
              
              {author == null ? (
                <></>
              ) : (
                <Stack direction="row" spacing={2}>
                <Avatar
                  alt="Profile picture"
                  src={author.profilePicture}
                  sx={{ width: "3rem", height: "3rem" }}
                />
                <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  textDecoration: "underline",
                  pt: "0.5rem"
                }}
              >
                {author == null ? "Author not found" : author.name}
              </Typography>
                </Stack>
              )}
            </Grid>
            <Grid xs={8}>
            </Grid>
            <Grid xs={6}>
              <Typography
                variant="body1"
                sx={{
                  color: "info.main",
                  textAlign: "right",
                }}
              >
                {comment.date}
              </Typography>
            </Grid>
          </Grid>
          <CustomizedRating
            readOnly={true}
            value={comment.rating}
            precision={0.5}
          />
          <Typography variant="body1">{comment.content}</Typography>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}
            sx={{
              pt: "0.5rem",
            }}
          >
             <ThumbsUpComponent commentId={comment.id} userId={user == null ? null : user.id} isAuthenticated={isAuthenticated}></ThumbsUpComponent>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default CommentCard;
