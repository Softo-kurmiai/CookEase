import Stack from '@mui/material/Stack';
import InfoTypography from "./InfoTypography";
import { Visibility, Comment, Favorite} from "@mui/icons-material";

interface InfoBarProps {
    author: string;
    viewCount: number;
    likeCount: number;
    commentCount: number;
  }

  export function InfoBar({ author, viewCount, likeCount, commentCount }: InfoBarProps) {
    return (
      <Stack direction="row" spacing={0.7} sx={{ pt: 1 }}>
        <InfoTypography>{author}</InfoTypography>
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