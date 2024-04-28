import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import RecipePhoto from "../../../images/CategoryImages/pasta.jpg";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import EditButton from "./EditButton";

export default function CollectionCard() {
  return (
    <Card sx={{ maxWidth: "20rem", padding:"0.5rem" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="220px"
          width="220px"
          image={RecipePhoto}
          alt="collection cover photo"
        />
        <CardContent>
          <Grid container spacing={0}>
            <Grid xs={9}>
              <Stack>
                <Typography variant="h6" component="div">
                  Lunch recipes
                </Typography>
                <Stack direction="row" spacing={1}>
                    <Typography variant="body2" component="div">
                        2 recipes
                    </Typography>
                    <Typography variant="body2" component="div" sx={{
                        color: "info.main"
                    }}>
                        2 w
                    </Typography>
                </Stack>
                    
              </Stack>
            </Grid>
            <Grid xs={3}>
              <EditButton/>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
