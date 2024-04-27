import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { RecipeCard } from '../../MainComponents/RecipeCard';
import {Stack } from "@mui/material";
import { Typography, useMediaQuery } from "@mui/material";
import { Theme } from "@mui/material/styles";

export function FollowedCreators(){
    const isSmallScreen = useMediaQuery((theme : Theme) => theme.breakpoints.down('sm'));
    const [page, setPage] = React.useState(1);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
      };

    return (
        <Stack alignItems="center" sx={{
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem"
        }}>
            <Typography variant={isSmallScreen ? "h6" : "h5"} align="left" sx={{ fontWeight: 600, pb:"0.8rem" }}>From creators you follow:</Typography>
            <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
                <RecipeCard></RecipeCard>
                <RecipeCard></RecipeCard>
                <RecipeCard></RecipeCard>
                <RecipeCard></RecipeCard>
                <RecipeCard></RecipeCard>
            </Stack>
            <Pagination count={10} page={page} onChange={handleChange} color="primary" sx={{
                padding:"0.5rem"
            }}/>
        </Stack>
    )
}

export default FollowedCreators;