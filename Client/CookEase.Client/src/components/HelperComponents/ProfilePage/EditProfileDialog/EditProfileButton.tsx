import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface EditProfileButtonProps {
    onClick: () => void;
  }

export function EditProfileButton({ onClick }: EditProfileButtonProps) {

    const handleEdit = () => {
        if (onClick) {
          onClick();
        }
      };

    const label = "Edit profile";

    return (
        <Button
            onClick={handleEdit}
            aria-label= {label}
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
                {label}
            </Typography>
        </Button>
    );
}

export default EditProfileButton;