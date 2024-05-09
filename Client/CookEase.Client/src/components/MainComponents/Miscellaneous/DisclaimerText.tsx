import { Stack } from "@mui/material";
import InfoTypography from "../../HelperComponents/RecipeCard/InfoTypography";
import { ReactNode } from "react";
import { SxProps } from "@mui/system";

interface DisclaimerTextProps {
  children: ReactNode;
  StarSx?: SxProps;
  TextSx?: SxProps;
}

export function DisclaimerText({
  children,
  StarSx,
  TextSx,
}: DisclaimerTextProps) {
  return (
    <Stack direction="row" spacing={0.5}>
      <InfoTypography sx={{ color: "secondary.main", ...StarSx }}>
        *
      </InfoTypography>
      <InfoTypography sx={{ ...TextSx }}>{children}</InfoTypography>
    </Stack>
  );
}

export default DisclaimerText;
