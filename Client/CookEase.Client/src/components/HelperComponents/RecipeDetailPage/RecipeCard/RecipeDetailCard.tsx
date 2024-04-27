import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import RecipeDetailCardHeader from './RecipeDetailCardHeader';
import Ratatouille from "../../../../images/ratatouille.jpg";
import IngredientInfo from './IngredientInfo';
import RecipeDetailInstructions from './RecipeDetailInstructions';

export function RecipeDetailCard() {

    const ingredientsString = `2 eggplants
        6 roma tomatoes
        2 yellow squashes
        2 zucchinis
        2 tablespoons olive oil
        1 medium white onion, diced
        4 cloves garlic, minced
        1 red bell pepper, seeded and diced
        1 yellow bell pepper, seeded and diced
        kosher salt, to taste
        freshly ground black pepper, to taste
        28 oz crushed tomatoes (795 g)
        2 tablespoons thinly sliced fresh basil
        2 tablespoons thinly sliced fresh basil
        1 teaspoon minced garlic
        2 tablespoons finely chopped fresh parsley
        2 teaspoons fresh thyme leaves
        kosher salt, to taste
        freshly ground black pepper, to taste
        4 tablespoons olive oil`;

        const recipeSteps = `Preheat the oven for 375˚F (190˚C).\n
        Using a sharp knife or a mandoline, slice the eggplant, tomatoes, squash, and zucchini into approximately ¹⁄₁₆-inch (1-mm)-thick rounds, then set aside.\n
        Make the sauce: Heat the olive oil in a 12-inch (30-cm) oven-safe pan over medium-high heat. Sauté the onion, garlic, and bell peppers until soft, about 10 minutes. Season with salt and pepper, then add the crushed tomatoes. Stir until the ingredients are fully incorporated. Remove from heat, then add the basil. Stir once more, then smooth the surface of the sauce with a spatula.\n
        Arrange the veggies in alternating slices, (for example, eggplant, tomato, squash, zucchini) on top of the sauce, working from the outer edge to the center of the pan. Season with salt and pepper.\n
        Make the herb seasoning: In a small bowl, mix together the basil, garlic, parsley, thyme, salt, pepper, and olive oil. Spoon the herb seasoning over the vegetables.\n
        Cover the pan with foil and bake for 40 minutes. Uncover, then bake for another 20 minutes, until the vegetables are softened.\n
        Serve hot as a main dish or side. The ratatouille is also excellent the next day–cover with foil and reheat in a 350˚F (180˚C) oven for 15 minutes, or simply microwave to desired temperature.\n
        Enjoy!`;

    return (
        <Paper elevation={3} sx={{ maxWidth: "65%", padding:"1rem" }}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Paper
                        style={{
                            position: 'relative',
                            maxWidth: '85%',
                            height: 0,
                            paddingBottom: '100%', // Maintain aspect ratio
                            overflow: 'hidden', // Hide overflowing content
                        }}
                    >
                        <img
                            src={Ratatouille}
                            alt="Ratatouille"
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <RecipeDetailCardHeader />
                </Grid>
                <Grid item xs={3}>
                    <IngredientInfo portions={2} ingredients={ingredientsString}/>
                </Grid>
                <Grid item xs={9}>
                    <RecipeDetailInstructions instructions={recipeSteps}/>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default RecipeDetailCard;
