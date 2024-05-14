import { useState } from "react";
import Button from "@mui/material/Button";

const FollowButton = () => {
  const [followed, setFollowed] = useState(false);

  const handleClick = () => {
    setFollowed(!followed);
    console.log("Send api call to create a follow relation");
  };

  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: followed ? "primary.main" : "info.main",
        color: "#FFFFFF",
        fontWeight: "700",
        boxShadow: "box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",
        borderRadius: "7px",
        "&:hover": {
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.6)",
        },
        textTransform: "none",
        width: "120px",
      }}
      onClick={handleClick}
    >
      {followed ? "Followed" : "Follow"}
    </Button>
  );
};

export default FollowButton;
