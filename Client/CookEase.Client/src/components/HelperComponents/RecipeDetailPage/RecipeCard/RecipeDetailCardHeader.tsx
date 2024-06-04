import { Theme } from "@mui/material/styles";
import { Typography,Stack, useMediaQuery } from "@mui/material";
import CustomizedRating from "../../RecipeCard/StyledRating";
import Grid from '@mui/material/Unstable_Grid2';
import { Favorite, Share} from "@mui/icons-material";
import CookTimeDetails from './CookTimeDetails';
import InfoBar from '../../RecipeCard/InfoBar';
import NutritionInfoPerServing from './NutritionInfoPerServing';
import { RecipeData } from '../../../../interfaces/RecipeDetailsInterfaces';
import React from 'react';
import RecipeCategoryChips from './RecipeCategoryChips';

interface RecipeDetailCardProps {
    recipeData?: RecipeData;
}

export function RecipeDetailCardHeader({recipeData} : RecipeDetailCardProps){
    const isSmallScreen = useMediaQuery((theme : Theme) => theme.breakpoints.down('sm'));

    const [authorName, setAuthorName] = React.useState("Gabubu");

    React.useEffect(() => {
        getAuthor(recipeData?.creatorId);
    }, [recipeData?.creatorId]);

    async function getAuthor(creatorId: number | undefined) {
        if(creatorId == undefined) {
            setAuthorName("");
            console.log("Could not get author name");
        } 
        else {
            axios.get(`/api/users/${creatorId}`)
                .then(response => {
                    console.log(response.data);
                    setAuthorName(response.data.name);
                })
        }
    }

    const onHeartButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log('Heart button clicked ' + e);

      };

    const onShareButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Share button clicked ' + e);
    };

    const nutritionData = {
        Cal: recipeData?.recipeNutrition.calories,
        Fat: recipeData?.recipeNutrition.fat,
        Carbs: recipeData?.recipeNutrition.carbs,
        Fiber: recipeData?.recipeNutrition.fiber,
        Sugar: recipeData?.recipeNutrition.sugar,
        Protein: recipeData?.recipeNutrition.protein,
    };

    return (
        <>
        <Grid container spacing={5}>
            <Grid xs={5}>
            <Typography variant={isSmallScreen ? "h6" : "h4"} align="left" sx={{ fontWeight: 600 }}>
                {recipeData?.name == undefined ? "No name found" : recipeData?.name}
            </Typography>
            </Grid>
            <Grid xs={2}>
                <CustomizedRating
                    readOnly={true}
                    value={recipeData?.rating == null || recipeData == undefined ? 0 : recipeData.rating}
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
        {
            recipeData == null ? <></> : <RecipeCategoryChips categories={recipeData?.categories}/>
        }
        <CookTimeDetails
            Total={recipeData == undefined ? 0 : recipeData.prepTime + recipeData.cookTime}
            Prep={recipeData == undefined? 0 : recipeData.prepTime} 
            Cook={recipeData == undefined? 0 : recipeData.cookTime} 
            Difficulty={recipeData?.difficulty}
        />
        <InfoBar 
            author={ authorName == "" ? "Undefined" : authorName}
            viewCount={recipeData == undefined? 0 : recipeData.viewCount} 
            likeCount={recipeData == undefined? 0 : recipeData.favoriteCount} 
            commentCount={recipeData == undefined? 0 : recipeData.commentCount}
            creatorId={recipeData?.creatorId ?? 0}
        />
        <NutritionInfoPerServing nutritionData={nutritionData}/>
        </>
    );
}

export default RecipeDetailCardHeader;