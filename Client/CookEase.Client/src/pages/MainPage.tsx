import { FindByCategorySection } from "../components/HelperComponents/MainPage/FindByCategorySection";
import ResponsiveMenuBar from "../components/MainComponents/ResponsiveMenuBar";
import {MainSearch} from "../components/HelperComponents/MainPage/MainSearch"
import MainPageSuggestions from "../components/HelperComponents/MainPage/MainPageSuggestions";
import MostPopular from "../components/HelperComponents/MainPage/MostPopular";
import Grid from '@mui/material/Unstable_Grid2';
import { Typography, useMediaQuery } from "@mui/material";
import { Theme } from "@mui/material/styles";
import FavoriteRecipes from "../components/HelperComponents/MainPage/FavoriteRecipes";
import FollowedCreators from "../components/HelperComponents/MainPage/FollowedCreators";

export default function MainPage(){
    const isSmallScreen = useMediaQuery((theme : Theme) => theme.breakpoints.down('sm'));
    return (
        <>
        <ResponsiveMenuBar isAuthenticated={false}></ResponsiveMenuBar>
        <MainSearch></MainSearch>
        <FindByCategorySection/>
        <Grid container spacing={2} paddingTop={5} paddingBottom={5}>
            <Grid xs={8}>
                <Typography variant={isSmallScreen ? "h6" : "h5"} align="center" sx={{ fontWeight: 600 }}>Suggestions:</Typography>
            </Grid>
            <Grid xs={4}>
            <Typography variant={isSmallScreen ? "h6" : "h5"} align="center" sx={{ fontWeight: 600 }}>Most popular 🔥</Typography>
            </Grid>
            <Grid xs={8}>
                <MainPageSuggestions/>
            </Grid>
            <Grid xs={4}>
                <MostPopular/>
            </Grid>
        </Grid>
            <FavoriteRecipes></FavoriteRecipes>
            <FollowedCreators></FollowedCreators>
        </>
    );
}