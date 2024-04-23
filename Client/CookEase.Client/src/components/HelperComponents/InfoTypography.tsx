import { ReactNode } from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

interface InfoTypographyProps {
  children: ReactNode;
}

const StyledInfoTypography = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    color: theme.palette.info.main,
    marginTop: '0.1rem',
  })
);

function InfoTypography({ children }: InfoTypographyProps) {
  return (
    <StyledInfoTypography gutterBottom variant="body2" component="div">
      {children}
    </StyledInfoTypography>
  );
}

export default InfoTypography;
