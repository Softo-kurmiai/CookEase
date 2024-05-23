import Button from "@mui/material/Button";

export function ShareButton() {
  const handleShare = async () => {
    try {
      await navigator.share({
        title: "Share Profile Link",
        url: "https://your-profile-link.com", // Replace with your actual profile link
      });
    } catch (error) {
      console.error("Error sharing:", error);
      // Fallback for browsers that don't support navigator.share
      // You can provide a fallback mechanism here
    }
  };

  return (
    <Button
      onClick={handleShare}
      aria-label="Share Profile"
      sx={{
        backgroundColor: "#9BCD6D",
        boxShadow: "box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",
        borderRadius: "7px",
        "&:hover": {
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.6)",
          backgroundColor: "#9BCD6D",
        },
        textTransform: "none",
        width: "120px",
        color: "#FFFFFF",
        fontWeight: "700"
      }}
    >
      Share
    </Button>
  );
}

export default ShareButton;
