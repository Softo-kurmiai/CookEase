import IconButton from '@mui/material/IconButton';
import Add from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';

interface AddRecipeButton{
  display: boolean;
}

function AddRecipeButton({display} : AddRecipeButton) {
  const handleClick = () => {
    console.log('Icon button clicked!');
  };

  return (
    <IconButton
      onClick={handleClick}
      aria-label="add recipe"
      sx={{
        backgroundColor: 'primary.main',
        borderRadius: '25px',
        '&:hover': {
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            backgroundColor: 'primary.main' 
        },
        display: display ? 'flex' : 'none',
        flexDirection: 'row', 
        alignItems: 'center',
        width: "200px"
      }}
    >
      <Add sx={{ color: '#FFFFFF' }} />
      <Typography variant="body2"
        sx={{ color: '#FFFFFF', marginLeft: '8px', pr: '7px', fontWeight: 700}}>Add recipe</Typography>
    </IconButton>
  );
}

export default AddRecipeButton;