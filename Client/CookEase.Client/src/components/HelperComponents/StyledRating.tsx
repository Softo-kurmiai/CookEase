import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#9BCD6D',
  },
});

function CustomizedRating() {
  return (
    <div>
      <StyledRating
        name="customized-color"
        defaultValue={2}
        precision={0.5}
        max={5}
      />
    </div>
  );
}

export default CustomizedRating;