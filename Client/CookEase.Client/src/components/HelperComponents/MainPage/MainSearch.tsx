import { Typography, Stack, Box, useMediaQuery } from "@mui/material";
import MainPhoto from '../../../images/CategoryImages/mainPhoto.png';
import { Theme } from "@mui/material/styles";
import MainSearchBar from "./MainSearchBar";

export function MainSearch() {
    const isSmallScreen = useMediaQuery((theme : Theme) => theme.breakpoints.down('sm'));

    return (
        <>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center">
                <Stack sx={{maxWidth: "700px"}}>
                    <Typography variant={isSmallScreen ? "h6" : "h3"} align="center" sx={{ fontWeight: 600 }}>Simple and tasty recipes from all around the world!</Typography>
                    <Typography variant={isSmallScreen ? "body2" : "body1"} align="center" sx={{ fontWeight: 400 }}>Post your own recipes or search according to categories and accounts</Typography>
                    <MainSearchBar></MainSearchBar>
                </Stack>
                <Box sx={{ display: { xs: 'none', sm: 'block' }, width: '100%', maxWidth:"500px" }}>
                    <img src={MainPhoto} alt="Picture of food" style={{ width: '100%' }} />
                </Box>
            </Stack>
        </>
    );
}

export default MainSearch;
