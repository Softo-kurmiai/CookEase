interface RecipeNutrition {
    calories: number;
    carbs: number;
    fat: number;
    fiber: number;
    protein: number;
    sugar: number;
  }
  
interface Recipe {
    categories: string[];
    cookTime: number;
    description: string;
    difficulty: string;
    image: string;
    ingredients: string;
    instructions: string;
    name: string;
    prepTime: number;
    servings: number;
    nutrition: RecipeNutrition;
  }