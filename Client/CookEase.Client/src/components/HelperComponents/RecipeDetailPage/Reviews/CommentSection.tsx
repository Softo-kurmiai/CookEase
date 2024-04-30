import { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CommentCard from "./CommentCard"; // Importing the CommentCard component
import Button from "@mui/material/Button";

const initialComments = [
  {
    id: 1,
    author: "Gabubu",
    date: "2024-04-28",
    rating: 3.5,
    content: "I made this and my mom was proud of me! 10/10 would recommend.",
    likes: 2,
  },
  {
    id: 2,
    author: "Gabubu",
    date: "2024-04-28",
    rating: 3.5,
    content: "I made this and my mom was proud of me! 10/10 would recommend.",
    likes: 2,
  },
  {
    id: 3,
    author: "Gabubu",
    date: "2024-04-28",
    rating: 3.5,
    content: "I made this and my mom was proud of me! 10/10 would recommend.",
    likes: 2,
  },
  {
    id: 4,
    author: "Gabubu",
    date: "2024-04-28",
    rating: 3.5,
    content: "I made this and my mom was proud of me! 10/10 would recommend.",
    likes: 2,
  },
  {
    id: 5,
    author: "Gabubu",
    date: "2024-04-28",
    rating: 3.5,
    content: "I made this and my mom was proud of me! 10/10 would recommend.",
    likes: 2,
  },
  {
    id: 6,
    author: "Gabubu",
    date: "2024-04-28",
    rating: 3.5,
    content: "I made this and my mom was proud of me! 10/10 would recommend.",
    likes: 2,
  },
  {
    id: 7,
    author: "Gabubu",
    date: "2024-04-28",
    rating: 3.5,
    content: "I made this and my mom was proud of me! 10/10 would recommend.",
    likes: 2,
  },
  {
    id: 8,
    author: "Gabubu",
    date: "2024-04-28",
    rating: 3.5,
    content: "I made this and my mom was proud of me! 10/10 would recommend.",
    likes: 2,
  },
];

export function CommentSection() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [comments, setComments] = useState(initialComments);
  const [visibleComments, setVisibleComments] = useState(4);

  const handleLoadMore = () => {
    setVisibleComments((prevCount) => prevCount + 4);
  };

  return (
    <>
      <Typography
        variant="h6"
        align="center"
        sx={{ fontWeight: 600, textAlign: "left" }}
      >
        8 total comments
      </Typography>
      <div>
        <Grid container spacing={2}>
          {comments.slice(0, visibleComments).map((comment) => (
            <Grid key={comment.id} item xs={12} md={6}>
              <CommentCard comment={comment} />{" "}
              {/* Ensure 'comment' prop is passed correctly */}
            </Grid>
          ))}
        </Grid>
        {visibleComments < comments.length && (
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <Button
        onClick={handleLoadMore}
        aria-label="load more"
        sx={{
          backgroundColor: "#9BCD6D",
          borderRadius: "7px",
          "&:hover": {
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.6)",
            backgroundColor: "#9BCD6D"
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
      </div>
      
    </>
  );
}

export default CommentSection;
