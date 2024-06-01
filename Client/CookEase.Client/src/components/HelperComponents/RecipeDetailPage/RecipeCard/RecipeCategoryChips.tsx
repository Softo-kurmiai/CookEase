import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface CategoryChipProps {
  categories: string[];
}

export default function CategoryChip({ categories }: CategoryChipProps) {
  return (
    <>
      <Stack direction="row">
        <Typography variant="body1" sx={{ fontWeight: 600, pt: '0.4rem', pr:'0.2rem' }}>
          Categories:
        </Typography>
        {categories.map((category, index) => (
          <Chip key={index} label={category} color="primary" sx={{ fontWeight: 600, color: 'white'}} />
        ))}
      </Stack>
    </>
  );
}
