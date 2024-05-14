using Application.DTOs;
using Application.DTOs.Recipe;
using Application.Enums;

namespace CookEase.Api.Interfaces;

public interface IRecipeService
{
    Task<(RecipeResponse? recipeResponse, Error? error)> CreateRecipe(
        RecipeCreateRequest request);

    Task<(RecipeResponse? recipeResponse, Error? error)> GetRecipeById(
        int recipeId);

    Task<(List<RecipeCardResponse>? recipeResponses, Error? error)> GetPaginatedRecipeCards(
        int recipesPerPage, int page);

    Task<List<RecipeCardResponse>> GetNumberOfTopLikedRecipeCards(
        int maxNumberOfRecipes);

    Task<List<RecipeCardResponse>> GetNumberOfRandomRecipeCards(
        int maxNumberOfRecipes);

    Task<(RecipeResponse? recipeResponse, Error? error)> DeleteRecipe(
        int recipeId);

    Task<(RecipeResponse? recipeResponse, Error? error)> UpdateRecipe(
        int recipeId,
        RecipeUpdateRequest recipeRequest);

    Task<(List<RecipeCardResponse>? creatorRecipes, Error? error)> GetRecipeCardsByCreatorId(
        int creatorId);

    Task<(List<RecipeResponse>? creatorRecipes, Error? error)> GetRecipesByCategoryName(
        Category categoryName);

    Task<(List<RecipeResponse>? recipesFound, Error? error)> SearchRecipesByName(
        string searchTerm);

    Task<Error?> IncreaseRecipeMetric(
        int recipeId,
        RecipeMetricsUpdateRequest recipeMetricToIncrease);

    Task<decimal> GetRecipeRating(
        int recipeId);

    Task<decimal> GetUserRecipeRating(
        int userId,
        int recipeId);

    Task UpdateUserRecipeRating(
        int userId,
        int recipeId,
        decimal newRatingValue);
}