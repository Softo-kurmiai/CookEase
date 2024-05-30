import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import CommentCard from "./CommentCard";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import axios from "axios";
import CustomToastContainer from "../../../../utils/Notifications/CustomToastContainer";
import { showToastError } from "../../../../utils/Notifications/toastUtils.ts";
import { User } from "../../../../interfaces/Interfaces.ts";

interface CommentSectionProps {
  recipeId: string;
  user: User | null;
  isAuthenticated: boolean;
}

export function CommentSection({ recipeId, user, isAuthenticated }: CommentSectionProps) {
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const commentsPerPage = 8;

  useEffect(() => {
    async function getComments(recipeId: string) {
      try {
        const response = await axios.get(
          `/api/comments/recipe/${recipeId}?commentsPerPage=${commentsPerPage}&page=${pageNumber}`
        );
        setComments(response.data);
      } catch (error) {
        showToastError("Could not retrieve comments for this recipe");
      }
    }

    if (recipeId != null || recipeId != undefined) {
      getComments(recipeId);
    }
  }, [recipeId, pageNumber]);

  useEffect(() => {
    async function getCommentCount(recipeId: string) {
      try {
        const response = await axios.get(
          `/api/comments/recipe/${recipeId}/totalCount`
        );
        setCommentCount(response.data);
      } catch (error) {
        showToastError("Could not retrieve total comment count for this recipe");
      }
    }

    if (recipeId != null || recipeId != undefined) {
      getCommentCount(recipeId);
    }
  }, [recipeId]);

  const handleLoadMore = () => {
    setPageNumber(pageNumber + 1);
  };

  return (
    <>
      <CustomToastContainer />
      <Typography
        variant="h5"
        align="center"
        sx={{ fontWeight: 600, textAlign: "left", pt: "1rem", pb: "1rem" }}
      >
        Total comment count: {commentCount}
      </Typography>
      <Grid container spacing={2}>
        {comments.map((comment, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <CommentCard comment={comment} />
          </Grid>
        ))}
      </Grid>
      {comments.length < commentCount && (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <Button
            onClick={handleLoadMore}
            aria-label="load more"
            sx={{
              backgroundColor: "#9BCD6D",
              borderRadius: "7px",
              "&:hover": {
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.6)",
                backgroundColor: "#9BCD6D",
              },
              mr: "2rem",
              textTransform: "none",
              width: "120px",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#FFFFFF",
                marginLeft: "5px",
                pr: "7px",
                fontWeight: 700,
              }}
            >
              Load more
            </Typography>
          </Button>
        </div>
      )}
    </>
  );
}

export default CommentSection;
