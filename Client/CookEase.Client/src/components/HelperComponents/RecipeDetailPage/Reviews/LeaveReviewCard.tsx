import React, { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { useAuth } from "../../../../utils/AuthContext";
import CustomToastContainer from "../../../../utils/Notifications/CustomToastContainer";
import { showToastError, showToastSuccess } from "../../../../utils/Notifications/toastUtils.ts";

interface ReviewCardProps {
  recipeId: number;
}

const ReviewForm = styled("form")({
  width: "100%",
  marginTop: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const ReviewTextArea = styled(TextField)({
  width: "100%",
  marginBottom: "10px",
});

const SendButton = styled(Button)({
  width: "100%",
});

const ReviewCard: React.FC<ReviewCardProps> = ({ recipeId }) => {
  const [value, setValue] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const { user, isAuthenticated } = useAuth();

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!isAuthenticated) {
      console.error("User not authenticated.");
      return;
    }

    try {
      console.log("Pre-sending review");
      // Send POST request to your API endpoint
      const response = await axios.post("/api/comments", {
        recipeId: recipeId,
        userId: user?.id,
        content: reviewText,
        rating: value,
      });

      console.log("Review submitted:", { rating: value, reviewText });
      showToastSuccess("Comment submitted successfully.");
      // Reset form fields after submission
      console.log(response.data)

      setValue(0);
      setReviewText("");
    } catch (error) {
      console.error("Error submitting review:", error);
      showToastError("Could not create comment. Try again.");
    }
  };

  // Function to handle changes in the review text field
  const handleReviewChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };

  // Function to handle rating change
  const handleRatingChange = (newValue: number | null) => {
    setValue(newValue ?? 0);
  };

  if (!isAuthenticated)
    return (
      <Typography variant="h5" sx={{ fontWeight: 600, mt: "0.7rem" }}>
        You can only leave a review when logged in.
      </Typography>
    );

  return (
    <Card
      sx={{
        maxWidth: "70%",
        mt: "5rem",
        mb: "5rem",
        boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-start"
          alignItems="center"
          sx={{
            mb: "1rem",
          }}
        >
          <Avatar
            alt="Your profile picture"
            src={user?.profilePicture ?? undefined} // Ensure src is string or undefined
            sx={{ width: "4rem", height: "4rem" }}
          />
          <Typography variant="h5" sx={{ fontWeight: 600, mt: "0.7rem" }}>
            Leave your own review
          </Typography>
        </Stack>

        <CustomToastContainer /> {/* Moved CustomToastContainer inside the ReviewCard component */}
        <Rating
          name="customized-color"
          value={value}
          onChange={(_, newValue) => {
            handleRatingChange(newValue);
          }}
          sx={{ color: "primary.main" }}
        />

        <ReviewForm onSubmit={handleSubmit}>
          <ReviewTextArea
            id="review-text"
            label="Your Review"
            multiline
            rows={4}
            value={reviewText}
            onChange={handleReviewChange}
          />
          <SendButton
            sx={{ maxWidth: "20%", color: "white", fontWeight: "600" }}
            variant="contained"
            type="submit"
          >
            Send
          </SendButton>
        </ReviewForm>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
