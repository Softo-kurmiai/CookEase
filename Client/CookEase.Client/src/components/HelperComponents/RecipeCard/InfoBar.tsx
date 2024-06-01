import Stack from '@mui/material/Stack';
import InfoTypography from "./InfoTypography";
import { Visibility, Comment, Favorite} from "@mui/icons-material";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';

interface InfoBarProps {
    author: string;
    viewCount: number;
    likeCount: number;
    commentCount: number;
    creatorId: number;
  }

  export function InfoBar({ author, viewCount, likeCount, commentCount, creatorId }: InfoBarProps) {

    const StyledInfoTypography = styled(Typography)<TypographyProps>(
      ({ theme }) => ({
        color: theme.palette.info.main,
        marginTop: "0.1rem",
      })
    );

    const navigate = useNavigate();

    const handleAuthorClick = () => {
      navigate(`/RecipePublisherPage/${creatorId}`);
    };

    return (
      <Stack direction="row" spacing={0.7} sx={{ pt: 1 }}>
        <StyledInfoTypography
          sx={{ pt: 1 }}
          gutterBottom
          variant="body2"
          component="div"
          onClick={handleAuthorClick}
        >
          {author}
        </StyledInfoTypography>
        <Visibility sx={{ color: 'info.main' }} />
        <InfoTypography>{viewCount}</InfoTypography>
        <Comment sx={{ color: 'info.main' }} />
        <InfoTypography>{commentCount}</InfoTypography>
        <Favorite sx={{ color: 'info.main' }} />
        <InfoTypography>{likeCount}</InfoTypography>
      </Stack>
    );
  }

export default InfoBar;