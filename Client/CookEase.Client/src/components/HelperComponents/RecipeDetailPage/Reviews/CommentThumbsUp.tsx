import React, { useState, useEffect } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CustomToastContainer from "../../../../utils/Notifications/CustomToastContainer";
import { showToastError } from "../../../../utils/Notifications/toastUtils";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface ThumbsUpComponentProps {
  commentId: number;
  userId: number | null;
  isAuthenticated: boolean;
}

const ThumbsUpComponent = ({
  commentId,
  userId,
  isAuthenticated,
}: ThumbsUpComponentProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [commentLike, setCommentLike] = useState<number | null>(null);

  useEffect(() => {
    async function getCommentLike(commentId: number) {
      try {
        const response = await axios.get(
          `/api/comments/comment/${commentId}/totalLikeCount`
        );
        setCommentLike(response.data);
        console.log("Gotten comment likes:", response.data);
      } catch (error) {
        console.error(error);
        setCommentLike(0);
      }
    }

    if (commentId && commentId !== 0) {
      getCommentLike(commentId);
    } else if (commentId === 0) {
      setCommentLike(0);
    }
  }, [commentId]);

  const handleThumbsUpClick = async () => {
    console.log("Click");
    if (isAuthenticated) {
      const newIsLiked = !isLiked;
      const actionName = newIsLiked ? "Increase" : "Decrease";

      try {
        await axios.put(
          `/api/comments/${commentId}/updateLikeCount?userId=${userId}`,
          {
            action: actionName,
          }
        );

        // Update the like count
        setCommentLike(prev => (prev !== null ? (newIsLiked ? prev + 1 : prev - 1) : prev));
        setIsLiked(newIsLiked);
        console.log("Call completed");
      } catch (error) {
        console.error("Error liking the comment:", error);
        showToastError("There was an error liking this comment");
      }
    } else {
      showToastError("Log in to like other comments");
    }
  };

  return (
    <IconButton onClick={handleThumbsUpClick}>
      <CustomToastContainer />
      <Stack direction="row">
        <ThumbUpIcon
          sx={{
            color: isLiked ? "#9BCD6D" : "#94A3B8",
          }}
        />
        <Typography
          variant="body2"
          sx={{
            textDecoration: "underline",
            color: "info.main",
            pl: "1rem",
          }}
        >
          {commentLike} people found this helpful
        </Typography>
      </Stack>
    </IconButton>
  );
};

export default ThumbsUpComponent;
