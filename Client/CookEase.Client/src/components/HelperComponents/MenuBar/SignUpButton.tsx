import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface SignUpButtonProps {
    display: boolean;
}

function SignUpButton({display} : SignUpButtonProps) {
  const handleClick = () => {
    console.log('Icon button clicked!');
  };

  return (
    <Button
      onClick={handleClick}
      aria-label="add recipe"
      sx={{
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        '&:hover': {
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            backgroundColor: 'primary.main' 
        },
        textTransform: 'none',
        width: '120px',
        display: display ? 'block' : 'none'
      }}
    >
      <Typography variant="body2"
        sx={{ color: '#000000', marginLeft: '8px', pr: '7px', fontWeight: 700}}>Sign up</Typography>
    </Button>
  );
}

export default SignUpButton;