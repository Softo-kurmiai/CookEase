import { Typography, Button } from '@mui/material';
import { ReactNode, MouseEventHandler  } from 'react';
import { SxProps } from '@mui/system';

interface GreenButtonProps {
    children: ReactNode;
    onClick: MouseEventHandler<HTMLButtonElement>;
    sx?: SxProps;
  }

const GreenButton: React.FC<GreenButtonProps> = ({ children, onClick, sx }) => {
    
    return (
        <Button
            onClick={onClick}
            aria-label="Share Profile"
            sx={{
                backgroundColor: "#9BCD6D",
                boxShadow: "box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",
                borderRadius: "7px",
                "&:hover": {
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.6)",
                    backgroundColor: "#9BCD6D"
                },
                textTransform: "none",
                width: "120px",
                ...sx
            }}
        >
            <Typography
                variant="body2"
                sx={{
                    color: "#FFFFFF",
                    marginLeft: "5px",
                    pr: "7px",
                    fontWeight: 700,
                }}
            >
                {children}
            </Typography>
        </Button>
    );
}

export default GreenButton;