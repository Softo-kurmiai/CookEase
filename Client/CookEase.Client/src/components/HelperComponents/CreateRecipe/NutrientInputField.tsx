import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

interface NutrientInputFieldProps {
  label: string;
  value: string;
  onChangeValue: (value: string) => void;
  measurement: string;
  onChangeMeasurement: (measurement: string) => void;
  measurementOptions: string[];
}

const NutrientInputField: React.FC<NutrientInputFieldProps> = ({
  label,
  value,
  onChangeValue,
}) => {
  return (
    <Stack direction="row" spacing={2}>
      <TextField
        label={label}
        value={value}
        onChange={(e) => onChangeValue(e.target.value)}
        fullWidth
      />
    </Stack>
  );
};

export default NutrientInputField;
