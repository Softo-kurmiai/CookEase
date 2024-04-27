import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { RecipeCard } from '../../MainComponents/RecipeCard';
import {Stack } from "@mui/material";

export default function MainPageSuggestions() {
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
      <div style={{ display: 'flex'}}>
        <Stack spacing={2} sx={{ width: '100%' }} alignItems="center">
          <Stack direction="row" spacing={2}>
            <RecipeCard></RecipeCard>
            <RecipeCard></RecipeCard>
            <RecipeCard></RecipeCard>
          </Stack>
          <Pagination count={10} page={page} onChange={handleChange} color="primary"/>
        </Stack>
      </div>
  );
}
