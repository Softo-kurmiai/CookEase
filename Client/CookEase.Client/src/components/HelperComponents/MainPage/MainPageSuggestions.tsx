import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { RecipeCard } from '../../MainComponents/RecipeCard';
import {Stack } from "@mui/material";
import axios from 'axios';

export default function MainPageSuggestions() {
  const [page, setPage] = React.useState(1);
  const [cardsPerPage] = React.useState(3);
  const [recipes, setRecipes] = React.useState([]);
  const [recipeCount, setRecipeCount] = React.useState(1);
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  React.useEffect(() => {
    getRandomRecipes();
    getRecipeCount();
  }, [page]);

  async function getRandomRecipes(){
    axios.get(`/api/recipes/random?maxNumberOfRecipes=${cardsPerPage}`)
    .then(response => {
      console.log(response.data);
      setRecipes(response.data);
    })
    .catch(_ => {
      console.log("Something bad happened during the request!");
    });
  }

  async function getRecipeCount(){
    axios.get(`/api/recipes/count`)
    .then(response => {
      console.log(response.data);
      setRecipeCount(response.data);
    })
    .catch(_ => {
      console.log("Something bad happened during the request!");
    });
  }

  return (
      <div style={{ display: 'flex'}}>
        <Stack spacing={2} sx={{ width: '100%' }} alignItems="center">
          <Stack direction="row" spacing={2}>
            <RecipeCard recipeData={recipes[0]}></RecipeCard>
            <RecipeCard recipeData={recipes[1]}></RecipeCard>
            <RecipeCard recipeData={recipes[2]}></RecipeCard>
          </Stack>
          <Pagination count={Math.ceil(recipeCount/cardsPerPage)} page={page} onChange={handleChange} color="primary"/>
        </Stack>
      </div>
  );
}

