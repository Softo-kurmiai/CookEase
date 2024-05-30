import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CustomizedRating from "../../../HelperComponents/RecipeCard/StyledRating";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { ThumbUp } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";
import React, { useState } from "react";
import CustomToastContainer from "../../../../utils/Notifications/CustomToastContainer.tsx"
import { showToastError } from "../../../../utils/Notifications/toastUtils.ts";

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

interface Author {
  id: number;
  name: string;
  email: string;
  description: string;
  profilePicture: string;
  createdAt: string;
  updatedAt: string | null;
  version: number;
}

export function CommentCard({ comment }: CommentCardProps) {

  const [author, setAuthor] = useState<Author | null>(null);
  const [commentLike, setCommentLike] = useState<number | null>(null);

  React.useEffect(() => {
    async function getAuthor(creatorId: number) {
      try {
        const response = await axios.get(`/api/users/${creatorId}`);
        setAuthor(response.data);
      } catch (error) {
        console.error(error);
        showToastError(`Could not retrieve comment ${comment.id} author`);
        setAuthor(null);
      }
    }

    if (comment.userId && comment.userId != 0) {
      getAuthor(comment.userId);
    } else if (comment.userId === 0) {
      setAuthor(null);
    }
  }, [comment.userId, comment.id]);

  React.useEffect(() => {
    async function getCommentLike(commentId: number) {
      try {
        const response = await axios.get(`/api/comments/comment/${commentId}/totalLikeCount`);
        setCommentLike(response.data);
      } catch (error) {
        console.error(error);
        setCommentLike(0);
      }
    }

    if (comment.id && comment.id != 0) {
      getCommentLike(comment.id);
    } else if (comment.id === 0) {
      setCommentLike(0);
    }
  }, [comment.id]);


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
            <ThumbUp sx={{ color: "info.main" }} />
            <Typography
              variant="body2"
              sx={{
                textDecoration: "underline",
                color: "info.main",
              }}
            >
              {commentLike} people found this helpful
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default CommentCard;
