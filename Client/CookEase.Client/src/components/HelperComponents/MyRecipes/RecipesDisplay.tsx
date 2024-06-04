import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { RecipeCard } from '../../MainComponents/RecipeCard';
import {Stack } from "@mui/material";

interface RecipesToDisplayProps
{
    isEditable : boolean
}

export function RecipesDisplay({isEditable} : RecipesToDisplayProps){
    const [page, setPage] = React.useState(1);

    const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
      };

    return (
        <Stack alignItems="center" sx={{
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem"
        }}>
            <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
                <RecipeCard isFavorited={true} isEditable={isEditable}></RecipeCard>
                <RecipeCard isFavorited={false} isEditable={isEditable}></RecipeCard>
                <RecipeCard isFavorited={true} isEditable={isEditable}></RecipeCard>
                <RecipeCard isFavorited={false} isEditable={isEditable}></RecipeCard>
            </Stack>
            <Pagination count={10} page={page} onChange={handleChange} color="primary" sx={{
                padding:"0.5rem"
            }}/>
        </Stack>
    )
}

export default RecipesDisplay;