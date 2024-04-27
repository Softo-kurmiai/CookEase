import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';

interface CustomizedRatingProps {
  readOnly: boolean;
  value: number;
  precision: number;
}

const StyledRating = styled(Rating)({
  paddingTop: "8px",
  '& .MuiRating-iconFilled': {
    color: '#9BCD6D',
  },
});

function CustomizedRating({ readOnly, value, precision} : CustomizedRatingProps) {
  return (
    <div>
      <StyledRating
        name="customized-color"
        readOnly={readOnly} 
        value = {value}
        precision = {precision}
      />
    </div>
  );
}

export default CustomizedRating;