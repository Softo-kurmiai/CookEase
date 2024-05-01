import { ReactNode } from "react";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { SxProps } from "@mui/system";

interface InfoTypographyProps {
  children: ReactNode;
  sx?: SxProps;
}

const StyledInfoTypography = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    color: theme.palette.info.main,
    marginTop: "0.1rem",
  })
);

function InfoTypography({ children, sx }: InfoTypographyProps) {
  return (
    <StyledInfoTypography
      sx={{
        ...sx,
      }}
      gutterBottom
      variant="body2"
      component="div"
    >
      {children}
    </StyledInfoTypography>
  );
}

export default InfoTypography;
