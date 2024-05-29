// src/types/interfaces.ts

export interface RecipeNutrition {
    id: number;
    recipeId: number;
    calories: number;
    fat: number;
    carbs: number;
    fiber: number;
    sugar: number;
    protein: number;
  }
  
  export interface RecipeData {
    id: number;
    creatorId: number;
    name: string;
    description: string;
    prepTime: number;
    cookTime: number;
    difficulty: string;
    rating: number;
    categories: string[];
    recipeNutrition: RecipeNutrition;
    instructions: string;
    servings: number;
    ingredients: string;
    image: string;
    viewCount: number;
    commentCount: number;
    favoriteCount: number;
    createdDate: string;
    updatedDate: string;
  }
  