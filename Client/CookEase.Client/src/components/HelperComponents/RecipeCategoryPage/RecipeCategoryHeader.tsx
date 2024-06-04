import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

interface RecipeCategoryHeaderProps {
    name: string,
    description: string,
    imageSrc: string,
    imageAlt: string
}

export function RecipeCategoryHeader(categoryData : RecipeCategoryHeaderProps) {
  return (
    <Box sx={{ p: 5, backgroundColor: "primary.main", maxHeight: "40%" }}>
      <Grid container spacing={2}>
        <Grid xs={6} style={{ display: "flex", alignItems: "center"}}>
          <Stack sx={{ textAlign: "left" }}>
            <Typography variant="h3" gutterBottom sx={{
                fontWeight:700
            }}>
              {categoryData.name}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {categoryData.description}
            </Typography>
          </Stack>
        </Grid>
        <Grid xs={6} style={{ display: "flex", alignItems: "center" }}>
          <img
            src={categoryData.imageSrc}
            alt={categoryData.imageAlt}
            style={{
              width: "40%",
              height: "auto",
              marginLeft: "auto", // Align image to the left
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
