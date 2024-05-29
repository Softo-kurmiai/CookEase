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
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function MainPage(){
    const isSmallScreen = useMediaQuery((theme : Theme) => theme.breakpoints.down('sm'));

    const location = useLocation();

    useEffect(() => {
        if (location.state?.toastMessage) {
            toast.success(location.state.toastMessage);
            // Clear the state after displaying the message
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    return (
        <>
        <ToastContainer/>
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