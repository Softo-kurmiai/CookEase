import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import RedButton from "../../../MainComponents/Miscellaneous/RedButton"

const handleDeleteButtonClick = () =>{
    console.log("Delete button clicked");
}

export function DeleteAccountSection(){
    return (
        <Grid container spacing={2} sx={{ pt: "1" }}>
            <Grid xs={10}>
              <Stack>
                <Typography
                  variant="body1"
                  component="h6"
                  sx={{ fontWeight: 600, color:"secondary.main"}}
                >
                  Delete account
                </Typography>
                <Typography
                  variant="body2"
                  component="h6"
                  sx={{ color: "info.main" }}
                >
                  Once you delete your account, there is no going back. Please be certain.
                </Typography>
              </Stack>
            </Grid>
            <Grid xs={2}>
                <RedButton onClick={handleDeleteButtonClick}>Delete</RedButton>
            </Grid>
          </Grid>
    );
}

export default DeleteAccountSection;