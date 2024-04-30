import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { IconButton, Typography } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  display: 'flex', // Apply flexbox
  justifyContent: 'center', // Center horizontally
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `1em`, // Increased padding here
    transition: theme.transitions.create('width'),
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.7)',
    textAlign: 'left',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

// Function to handle the click event
const handleClick = () => {
  console.log('Icon button clicked');
};

export default function MainSearchBar() {
  return (
    <Search>
      <StyledInputBase
        placeholder="Search..."
        inputProps={{ 'aria-label': 'search for recipes' }}
      />
      <IconButton
        onClick={handleClick}
        aria-label="add recipe"
        sx={{
          backgroundColor: 'primary.main',
          borderRadius: '8px',
          margin: '20px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.7)',
          '&:hover': {
            backgroundColor: 'primary.main'
          },
        }}
      >
        <Typography variant="body2"
          sx={{ color: '#FFFFFF', marginLeft: '8px', pr: '7px', fontWeight: 700 }}>Search</Typography>
      </IconButton>
    </Search>
  );
}
