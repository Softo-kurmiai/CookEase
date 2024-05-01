﻿using Infrastructure.Models;

namespace Infrastructure.Interfaces;

public interface IRecipeCategoryRepository : IGenericRepository<RecipeCategory>
{
    Task ReplaceRecipeCategories(int recipeId, List<RecipeCategory> newCategories);

    Task<List<RecipeCategory>?> GetCategoriesByRecipeId(int recipeId);
}