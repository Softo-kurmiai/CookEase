using Application.DTOs;
using Application.DTOs.Recipe;

namespace CookEase.Api.Interfaces;

public interface IRecipeService
{
    Task<(RecipeResponse? recipeResponse, Error? error)> CreateRecipe(
        RecipeCreateRequest request);

    Task<(RecipeResponse? recipeResponse, Error? error)> GetRecipeById(
        int recipeId);

    Task<(List<RecipeResponse>? recipeResponses, Error? error)> GetPaginatedRecipes(
        int recipesPerPage, int page);

    Task<List<RecipeResponse>> GetNumberOfTopLikedRecipes(
        int maxNumberOfRecipes);

    Task<List<RecipeResponse>> GetNumberOfRandomRecipes(
        int maxNumberOfRecipes);

    Task<(RecipeResponse? recipeResponse, Error? error)> DeleteRecipe(
        int recipeId);

    Task<(RecipeResponse? recipeResponse, Error? error)> UpdateRecipe(
        int recipeId,
        RecipeUpdateRequest recipeRequest);

    Task<(List<RecipeResponse>? creatorRecipes, Error? error)> GetRecipesByCreatorId(
        int creatorId);

    Task<Error?> IncreaseRecipeMetric(
        int recipeId,
        RecipeMetricsUpdateRequest recipeMetricToIncrease);

    //Task UpdateUserRecipeRating(
    //    int userId,
    //    int recipeId,
    //    decimal newRatingValue);
}