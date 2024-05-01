import * as React from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";

interface CustomInputFieldProps {
  labelName: string;
  value: string;
  measurement: string;
  measurementOptions: string[];
  onChangeValue: (value: string) => void;
  onChangeMeasurement: (measurement: string) => void;
}

const CustomInputField: React.FC<CustomInputFieldProps> = ({
  labelName,
  value,
  measurement,
  onChangeValue,
  onChangeMeasurement,
  measurementOptions,
}) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      alignItems="flex-end"
    >
      <TextField
        label={labelName}
        value={value}
        onChange={(e) => onChangeValue(e.target.value)}
        sx={{
            width: "70%"
        }}
      />
      <FormControl fullWidth>
        <FormLabel>{labelName} measurement</FormLabel>
        <TextField
          select
          value={measurement}
          onChange={(e) => onChangeMeasurement(e.target.value)}
          sx={{
            width: "40%"
        }}
        >
          {measurementOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
    </Stack>
  );
};

export default CustomInputField;
