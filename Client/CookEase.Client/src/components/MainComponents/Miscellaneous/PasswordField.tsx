import TextField from "@mui/material/TextField";
import { SxProps } from '@mui/system';

interface PasswordFieldProps {
    placeholder: string;
    label: string;
    sx?: SxProps;
  }


export function PasswordField({placeholder, label, sx} : PasswordFieldProps) {
  return (
    <TextField
      id="outlined-password-input"
      label={label}
      type="password"
      autoComplete="current-password"
      margin="dense"
      fullWidth
      placeholder={placeholder}
      sx={{
        "& .MuiInput-underline:before": {
          borderBottomColor: "primary.main", // Default underline color when not focused
        },
        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
          borderBottomColor: "primary.main", // Hover underline color when not focused
        },
        ...sx
      }}
    />
  );
}

export default PasswordField;
