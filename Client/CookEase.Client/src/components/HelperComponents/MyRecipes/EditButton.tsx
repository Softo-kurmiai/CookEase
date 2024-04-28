import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export function EditButton() {
    const handleEdit = async () => {
        console.log("Edit button is pressed");
    };

    return (
        <Button
            onClick={handleEdit}
            aria-label="Edit recipe"
            sx={{
                backgroundColor: "#9BCD6D",
                boxShadow: "box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",
                borderRadius: "25px",
                "&:hover": {
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    backgroundColor: "#9BCD6D"
                },
                textTransform: "none",
                width: "80px",
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
                Edit
            </Typography>
        </Button>
    );
}

export default EditButton;