import { SmallRecipeCard } from "../../MainComponents/SmallRecipeCard";
import {Stack } from "@mui/material";

export function MostPopular(){
    return (
        <div style={{ display: 'flex', paddingRight:'4rem'}}>
        <Stack spacing={2} sx={{ width: '100%' }}>
            <SmallRecipeCard></SmallRecipeCard>
            <SmallRecipeCard></SmallRecipeCard>
            <SmallRecipeCard></SmallRecipeCard>
        </Stack>
      </div>
    );
}

export default MostPopular;