import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { RecipeCard } from '../../MainComponents/RecipeCard';
import {Stack } from "@mui/material";
import axios from 'axios';
import { useAuth } from '../../../utils/AuthContext';

interface RecipesToDisplayProps {
    isEditable : boolean
}

export function RecipesDisplay({ isEditable } : RecipesToDisplayProps){
    const [page, setPage] = React.useState(1);
    const [cardsPerPage] = React.useState(4);
    const [recipes, setRecipes] = React.useState([]);
    const [recipeCount, setRecipeCount] = React.useState(0); // Start with 0 recipes

    const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const { user } = useAuth();

    React.useEffect(() => {
        getPaginatedAuthorRecipes();
        getAuthorRecipeCount();
      }, [page]);
    
    async function getPaginatedAuthorRecipes() {
        try {
            const response = await axios.get(`/api/recipes/creator/${user?.id}?recipesPerPage=${cardsPerPage}&page=${page}`);
            setRecipes(response.data);
        } catch (error) {
            console.log("Something bad happened during the request!", error);
        }
    }

    async function getAuthorRecipeCount() {
        try {
            const response = await axios.get(`/api/recipes/creator/${user?.id}/count`);
            setRecipeCount(response.data);
        } catch (error) {
            console.log("Something bad happened during the request!", error);
        }
    }

    const pageCount = Math.ceil(recipeCount / cardsPerPage);

    return (
        <Stack alignItems="center" sx={{
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem"
        }}>
            <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
                {recipes.map(recipe => (
                    <RecipeCard recipeData={recipe} isEditable={isEditable} />
                ))}
                {recipes.length < cardsPerPage && // Add empty cards if fewer recipes than cardsPerPage
                    Array.from({ length: cardsPerPage - recipes.length }).map((_, index) => (
                    <div key={`empty-${index}`} style={{ width: '280px', height: '280px', border: '1px solid transparent' }} />
                ))}
            </Stack>
            {
                recipeCount < 4 ? <></> : <Pagination count={pageCount} page={page} onChange={handleChange} color="primary" />
            }
        </Stack>
    )
}

export default RecipesDisplay;