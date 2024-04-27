import { Typography, Stack } from '@mui/material';

export function IngredientInfo({ ingredients = "none", portions = 1 }) {
    const ingredientList = ingredients.split('\n').map((ingredient, index) => (
        <li key={index}>
            <Typography variant="body1">{ingredient}</Typography>
        </li>
    ));

    return (
        <Stack>
            <Typography variant="h5" sx={{ fontWeight: 600}}>Portions: {portions}</Typography>
            <ul>
                {ingredientList}
            </ul>
        </Stack>
    );
}

export default IngredientInfo;
