import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import PasswordField from "../../../MainComponents/Miscellaneous/PasswordField";
import Grid from "@mui/material/Unstable_Grid2";

export function ChangePasswordSection() {
  return (
    <Stack>
      <Typography
        gutterBottom
        variant="body1"
        component="h6"
        sx={{ fontWeight: "600", tm:"2rem" }}
      >
        Change password:
      </Typography>
      <Grid container spacing={2}>
        <Grid xs={6}>
          <PasswordField
            placeholder="Enter your current password"
            label="Current password"
          />
        </Grid>
        <Grid xs={6}></Grid>
        <Grid xs={6}>
          <PasswordField placeholder="Enter ew password" label="New password" />
        </Grid>
        <Grid xs={6}>
          <PasswordField
            placeholder="Repeat new password"
            label="Repeat new password"
          />
        </Grid>
      </Grid>
    </Stack>
  );
}

export default ChangePasswordSection;
