import React from "react";
import { SmallRecipeCard } from "../../MainComponents/SmallRecipeCard";
import { Stack } from "@mui/material";
import axios from "axios";

export function MostPopular() {
    const [recipes, setRecipes] = React.useState([]);

    React.useEffect(() => {
        async function getTopLikedRecipes() {
            try {
                const response = await axios.get(`/api/recipes/topLiked?maxNumberOfRecipes=3`);
                console.log(response.data);
                setRecipes(response.data);
            } catch (error) {
                console.log("Something bad happened during the request!", error);
            }
        }

        getTopLikedRecipes();
    }, []);
    
    return (
        <div style={{ display: 'flex', paddingRight: '4rem' }}>
            <Stack spacing={2} sx={{ width: '100%' }}>
                {recipes.length > 0 && recipes.map((recipe, index) => (
                    <SmallRecipeCard key={index} recipe={recipe} />
                ))}
            </Stack>
        </div>
    );
}

export default MostPopular;
