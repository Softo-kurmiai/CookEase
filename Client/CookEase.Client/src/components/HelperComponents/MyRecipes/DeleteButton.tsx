import Button from "@mui/material/Button";

function HandleDelete() {
  console.log("Delete button clicked");
}

export function DeleteButton() {
  return (
    <Button
      variant="outlined"
      color="error"
      onClick={HandleDelete}
      sx={{
        mt: "0.5rem",
        fontWeight: 600,
      }}
    >
      Delete
    </Button>
  );
}

export default DeleteButton;
