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
        int creatorId,
        int recipesPerPage,
        int page);

    Task<(List<RecipeCardResponse>? creatorRecipes, Error? error)> GetRecipeCardsByCategoryName(
        Category categoryName,
        int recipesPerPage,
        int page);

    Task<(List<RecipeCardResponse>? recipesFound, Error? error)> SearchRecipeCardsByName(
        string searchTerm,
        int recipesPerPage,
        int page);

    Task<Error?> IncreaseRecipeMetric(
        int recipeId,
        RecipeMetricsUpdateRequest recipeMetricToIncrease);
}