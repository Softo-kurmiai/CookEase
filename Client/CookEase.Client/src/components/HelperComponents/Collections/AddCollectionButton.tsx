import IconButton from "@mui/material/IconButton";
import Add from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function AddCollectionButton() {
  const handleClick = () => {
    console.log("Add new collection button clicked");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        width: "100%",
        pb: "1rem"
      }}
    >
      <Box sx={{ marginRight: "16px" }}>
        <IconButton
          onClick={handleClick}
          aria-label="add new collection"
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
            backgroundColor: "primary.main",
            borderRadius: "25px",
            "&:hover": {
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              backgroundColor: "primary.main",
            },
          }}
        >
          <Add sx={{ color: "#FFFFFF" }} />
          <Typography
            variant="body2"
            sx={{ color: "#FFFFFF", fontWeight: 700 }}
          >
            Add new collection
          </Typography>
        </IconButton>
      </Box>
    </Box>
  );
}

export default AddCollectionButton;
