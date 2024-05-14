﻿using Infrastructure.Models;

namespace Infrastructure.Interfaces;

public interface IRecipeRepository : IGenericRepository<Recipe>
{
    Task<List<Recipe>?> GetRecipesByRecipeIds(List<int> recipeIds);

    Task<List<Recipe>?> GetRecipesByCreatorId(int id);

    Task<List<Recipe>?> SearchRecipesByName(string searchTerm);

    Task<Recipe?> IncreaseRecipeViewCount(int recipeId);

    Task<Recipe?> IncreaseRecipeFavoriteCount(int recipeId);

    Task<Recipe?> DecreaseRecipeFavoriteCount(int recipeId);

    Task<List<Recipe>> GetNumberOfTopLikedRecipes(int maxNumberOfRecipes);

    Task<List<Recipe>> GetNumberOfRandomRecipes(int maxNumberOfRecipes);
}