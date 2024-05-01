import { Button } from '@mui/material';
import { ReactNode, MouseEventHandler  } from 'react';
import { SxProps } from '@mui/system';

interface RedButtonProps {
    children: ReactNode;
    onClick: MouseEventHandler<HTMLButtonElement>;
    sx?: SxProps;
}

const RedButton : React.FC<RedButtonProps> = ({ children, onClick, sx }) => {
  return (
    <Button
      variant="outlined"
      color="error"
      onClick={onClick}
      sx={{
        mt: "0.5rem",
        fontWeight: 600,
        ...sx
      }}
    >
      {children}
    </Button>
  );
}

export default RedButton;
