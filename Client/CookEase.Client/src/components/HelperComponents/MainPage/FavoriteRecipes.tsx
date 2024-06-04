import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { RecipeCard } from '../../MainComponents/RecipeCard';
import { Stack } from "@mui/material";
import { Typography, useMediaQuery } from "@mui/material";
import { Theme } from "@mui/material/styles";
import axios from 'axios';
import { RecipeData } from '../../../interfaces/RecipeDetailsInterfaces';

export function FavoriteRecipes(){
    const isSmallScreen = useMediaQuery((theme : Theme) => theme.breakpoints.down('sm'));
    const [page, setPage] = React.useState(1);
    const [recipes, setRecipes] = React.useState([]);

    const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    React.useEffect(() => {
        async function getRandomRecipes() {
            try {
                const response = await axios.get(`/api/recipes/random?maxNumberOfRecipes=5`);
                console.log(response.data);
                setRecipes(response.data);
            } catch (error) {
                console.log("Something bad happened during the request!", error);
            }
        }
        getRandomRecipes()
    }, []);

    return (
        <Stack alignItems="center" sx={{
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem"
        }}>
            <Typography variant={isSmallScreen? "h6" : "h5"} align="left" sx={{ fontWeight: 600, pb:"0.8rem" }}>Your favorite recipes:</Typography>
            <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
                {recipes.map((recipe : RecipeData, index: number) => (
                    <RecipeCard key={index} recipeData={recipe} isFavorited={true} />
                ))}
            </Stack>
            <Pagination count={10} page={page} onChange={handleChange} color="primary" sx={{
                padding:"0.5rem"
            }}/>
        </Stack>
    )
}

export default FavoriteRecipes;