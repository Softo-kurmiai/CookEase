import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";

interface ChangePasswordSectionProps {
  currentPassword: string;
  setCurrentPassword: (password: string) => void;
  newPassword: string;
  setNewPassword: (password: string) => void;
  repeatNewPassword: string;
  setRepeatNewPassword: (password: string) => void;
}

export function ChangePasswordSection({
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  repeatNewPassword,
  setRepeatNewPassword
}: ChangePasswordSectionProps) {
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
          <TextField
            id="currentPassword"
            name="currentPassword"
            label={"Current password"}
            type="password"
            autoComplete="current-password"
            margin="dense"
            fullWidth
            autoFocus
            placeholder={"Enter your current password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </Grid>
        <Grid xs={6}></Grid>
        <Grid xs={6}>
          <TextField
            id="newPassword"
            name="newPassword"
            label={"New password"}
            type="password"
            margin="dense"
            fullWidth
            placeholder={"Enter new password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Grid>
        <Grid xs={6}>
          <TextField
            id="repeatNewPassword"
            name="repeatNewPassword"
            label={"Repeat new password"}
            type="password"
            margin="dense"
            fullWidth
            placeholder={"Repeat new password"}
            value={repeatNewPassword}
            onChange={(e) => setRepeatNewPassword(e.target.value)}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}

export default ChangePasswordSection;
