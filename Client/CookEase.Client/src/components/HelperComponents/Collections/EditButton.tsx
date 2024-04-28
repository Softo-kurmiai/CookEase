import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export function EditButton() {
    const handleEdit = async () => {
        console.log("Edit button clicked");
    };

    return (
        <Button
            onClick={handleEdit}
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
                width: "45px",
            }}
        >
            <Typography
                variant="body2"
                sx={{
                    color: "#FFFFFF",
                    fontWeight: 700,
                }}
            >
                Edit
            </Typography>
        </Button>
    );
}

export default EditButton;