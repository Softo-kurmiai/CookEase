import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

interface LogInButtonProps {
    display: boolean;
}

function LogInButton({display} : LogInButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/SignIn');
  };

  return (
    <Button
      onClick={handleClick}
      aria-label="add recipe"
      sx={{
        backgroundColor: '#000000',
        borderRadius: '7px',
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
        sx={{ color: '#FFFFFF', marginLeft: '8px', pr: '7px', fontWeight: 700}}>Login</Typography>
    </Button>
  );
}

export default LogInButton;