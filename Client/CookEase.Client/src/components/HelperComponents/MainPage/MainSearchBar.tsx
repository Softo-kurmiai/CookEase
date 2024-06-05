import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

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

export default function MainSearchBar() {

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      navigate(`/Search?searchTerm=${searchTerm}`);
    } catch (error) {
      //showToastError("Could not navigate to search page");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Search>
      <StyledInputBase
        placeholder="Search..."
        inputProps={{ 'aria-label': 'search for recipes' }}
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        onKeyPress={handleKeyPress}
      />
      <IconButton
        onClick={handleSearch}
        aria-label="search"
        sx={{
          backgroundColor: 'primary.main',
          borderRadius: '25px',
          margin: '20px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.7)',
          '&:hover': {
            backgroundColor: 'primary.main'
          },
        }}
      >
        <SearchIcon sx={{ color: "white"}}></SearchIcon>
      </IconButton>
    </Search>
  );
}