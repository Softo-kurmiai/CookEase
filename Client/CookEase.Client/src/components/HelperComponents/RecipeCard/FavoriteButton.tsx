import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface FavoriteButtonProps {
  sx?: React.CSSProperties;
  isFavorited: boolean
}

function FavoriteButton({ sx, isFavorited }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(isFavorited);

  const handleClick = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <IconButton
      onClick={handleClick}
      aria-label="favorite"
      sx={{
        ...sx,
        background: '#fff',
        '&:hover': {
          background: '#fff',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.9)',
          border: '1px solid #FFFFFF',
        },
      }}
    >
      {isFavorite ? <FavoriteIcon style={{ color: '#FF4081' }} /> : <FavoriteBorderIcon />}
    </IconButton>
  );
}

export default FavoriteButton;