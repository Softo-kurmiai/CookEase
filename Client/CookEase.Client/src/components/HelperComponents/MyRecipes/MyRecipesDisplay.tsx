import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { RecipeCard } from '../../MainComponents/RecipeCard';
import {Stack } from "@mui/material";


export function MyRecipesDisplay(){
    const [page, setPage] = React.useState(1);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
      };

    return (
        <Stack alignItems="center" sx={{
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem"
        }}>
            <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
                <RecipeCard isFavorited={true} isEditable={true}></RecipeCard>
                <RecipeCard isFavorited={false} isEditable={true}></RecipeCard>
                <RecipeCard isFavorited={true} isEditable={true}></RecipeCard>
                <RecipeCard isFavorited={false} isEditable={true}></RecipeCard>
            </Stack>
            <Pagination count={10} page={page} onChange={handleChange} color="primary" sx={{
                padding:"0.5rem"
            }}/>
        </Stack>
    )
}

export default MyRecipesDisplay;