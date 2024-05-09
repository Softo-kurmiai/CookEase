import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InfoTypography from "../RecipeCard/InfoTypography";
import Stack from "@mui/material/Stack";
import ExampleImage from "../../../images/ExampleImages/exampleImage.jpeg";
import ExampleImage2 from "../../../images/ExampleImages/exampleimage2.png";

export function PhotoGuidelines() {
  // Define lists of do's and don'ts
  const dos = ["Landscape (horizontal) photos", "Photos including your dish"];
  const donts = [
    "No portrait (vertical) photos",
    "No people or pets in your photo",
    "No personal information (name, age, etc.)",
  ];

  return (
    <Card
      sx={{
        backgroundColor: "rgba(148, 163, 184, 0.11)",
        borderRadius: "12px",
      }}
    >
      <CardContent>
        <Typography
          variant="body2"
          color="divider"
          sx={{
            fontWeight: "600",
          }}
        >
          Photo guidelines
        </Typography>
        <InfoTypography sx={{ color: "divider" }}>
          Please follow the guidelines provided here, if your uploaded photo
          does not follow the guidelines - your recipe will be rejected.
        </InfoTypography>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-around"
          alignItems="center"
        >
          <img
            src={ExampleImage}
            alt="Example Image 1"
            style={{ width: "400px", height: "auto" }}
          />
          <img
            src={ExampleImage2}
            alt="Example Image 2"
            style={{ width: "400px", height: "auto" }}
          />
        </Stack>
        <Typography
          variant="body1"
          color="primary.main"
          sx={{
            fontWeight: "600",
          }}
        >
          Do's:
        </Typography>
        <ul>
          {dos.map((item, index) => (
            <li key={index}>
              <Typography variant="body1" color="divider">
                {item}
              </Typography>
            </li>
          ))}
        </ul>

        <Typography
          variant="body1"
          color="secondary.main"
          sx={{
            fontWeight: "600",
          }}
        >
          Dont's:
        </Typography>
        <ul>
          {donts.map((item, index) => (
            <li key={index}>
              <Typography variant="body1" color="divider">
                {item}
              </Typography>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default PhotoGuidelines;
