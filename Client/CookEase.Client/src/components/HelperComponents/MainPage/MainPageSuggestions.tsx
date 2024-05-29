import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { RecipeCard } from '../../MainComponents/RecipeCard';
import { Stack } from "@mui/material";
import axios from 'axios';

export default function MainPageSuggestions() {
  const [page, setPage] = React.useState(1);
  const [cardsPerPage] = React.useState(3);
  const [recipes, setRecipes] = React.useState([]);
  const [recipeCount, setRecipeCount] = React.useState(0); // Start with 0 recipes
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  React.useEffect(() => {
    getRandomRecipes();
    getRecipeCount();
  }, [page]);

  async function getRandomRecipes() {
    try {
      const response = await axios.get(`/api/recipes?recipesPerPage=${cardsPerPage}&page=${page}`);
      console.log(response.data);
      setRecipes(response.data);
    } catch (error) {
      console.log("Something bad happened during the request!", error);
    }
  }

  async function getRecipeCount() {
    try {
      const response = await axios.get(`/api/recipes/count`);
      console.log(response.data);
      setRecipeCount(response.data);
    } catch (error) {
      console.log("Something bad happened during the request!", error);
    }
  }

  const pageCount = Math.ceil(recipeCount / cardsPerPage);

  return (
    <div style={{ display: 'flex' }}>
      <Stack spacing={2} sx={{ width: '100%' }} alignItems="center">
        <Stack direction="row" spacing={2}>
          {recipes.map(recipe => (
            <RecipeCard recipeData={recipe} />
          ))}
          {recipes.length < cardsPerPage && // Add empty cards if fewer recipes than cardsPerPage
            Array.from({ length: cardsPerPage - recipes.length }).map((_, index) => (
              <div key={`empty-${index}`} style={{ width: '280px', height: '280px', border: '1px solid transparent' }} />
            ))
          }
        </Stack>
        <Pagination count={pageCount} page={page} onChange={handleChange} color="primary" />
      </Stack>
    </div>
  );
}