import { ChangeEvent, FormEvent, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Rating from '@mui/material/Rating';
import Gabubu from "../../../../images/Gabubu.jpg";

const ReviewForm = styled('form')({
  width: '100%',
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const ReviewTextArea = styled(TextField)({
  width: '100%',
  marginBottom: '10px',
});

const SendButton = styled(Button)({
  width: '100%',
});

interface ReviewCardProps {
  isAuthenticated: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ isAuthenticated }) => {
  const [value, setValue] = useState<number>(0); // For storing rating value
  const [reviewText, setReviewText] = useState<string>(''); // For storing review text

  // Function to handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Process review submission here
    console.log('Review submitted:', { rating: value, reviewText });
    // Reset form fields after submission
    setValue(0);
    setReviewText('');
  };

  // Function to handle changes in the review text field
  const handleReviewChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };

  // Function to handle rating change
  const handleRatingChange = (newValue: number | null) => {
    setValue(newValue ?? 0);
  };

  if (!isAuthenticated) return <Typography variant="h5" sx={{ fontWeight: 600, mt: "0.7rem" }}>
    You can only leave review when logged in.
    </Typography>;

  return (
    <Card
      sx={{
        maxWidth: "70%",
        mt: "5rem",
        mb: "5rem"
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-start"
          alignItems="center"
          sx={{
            mb: "1rem"
          }}
        >
          <Avatar alt="Your profile picture" src={Gabubu} sx={{ width: "4rem", height: "4rem" }} />
          <Typography variant="h5" sx={{ fontWeight: 600, mt: "0.7rem" }}>Leave your own review</Typography>
        </Stack>

        <Rating
          name="customized-color"
          value={value}
          onChange={(_, newValue) => {
            handleRatingChange(newValue);
          }}
          sx={{ color: 'primary.main' }} // Green color
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
          <SendButton sx={{ maxWidth: "20%", color: "white", fontWeight: "600" }} variant="contained" type="submit">Send</SendButton>
        </ReviewForm>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
