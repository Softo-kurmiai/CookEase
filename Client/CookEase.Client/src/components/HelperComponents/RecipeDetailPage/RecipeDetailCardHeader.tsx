import React from 'react';
import { Theme } from "@mui/material/styles";
import { Typography,Stack, useMediaQuery } from "@mui/material";
import CustomizedRating from "../RecipeCard/StyledRating";
import Grid from '@mui/material/Unstable_Grid2';
import { Favorite, Share} from "@mui/icons-material";
import CookTimeDetails from './CookTimeDetails';
import InfoBar from '../RecipeCard/InfoBar';
import NutritionInfoPerServing from './NutritionInfoPerServing';

export function RecipeDetailCardHeader(){
    const isSmallScreen = useMediaQuery((theme : Theme) => theme.breakpoints.down('sm'));

    const onHeartButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log('Heart button clicked ' + e);

      };

    const onShareButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Share button clicked ' + e);
    };

    const nutritionData = {
        Cal: 100,
        Fat: 10,
        Carbs: 20,
        Fiber: 5,
        Sugar: 8,
        Protein: 15
    };

    return (
        <>
        <Grid container spacing={5}>
            <Grid xs={3}>
            <Typography variant={isSmallScreen ? "h6" : "h4"} align="left" sx={{ fontWeight: 600 }}>Ratatouille</Typography>
            </Grid>
            <Grid xs={4}>
                <CustomizedRating
                    readOnly={true}
                    value={3.5}
                    precision={0.5}/>
            </Grid>
            <Grid xs={5}>
                <Stack direction="row" justifyContent="flex-end">
                <button onClick={onHeartButtonClick} className="custom-button">
                    <Favorite style={{ color: '#94A3B8' }}/>
                </button>
                <button onClick={onShareButtonClick} className="custom-button">
                    <Share style={{ color: '#94A3B8' }}/>
                </button>
                </Stack>
            </Grid>
        </Grid>
        <CookTimeDetails Total={30} Prep={20} Cook={10} Difficulty='Easy' />
        <InfoBar author="Gabubu" viewCount={1328} likeCount={120} commentCount={15} />
        <NutritionInfoPerServing nutritionData={nutritionData}/>
        </>
    );
}

export default RecipeDetailCardHeader;