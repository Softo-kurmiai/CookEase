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

    Task<(RecipeResponse? recipeResponse, Error? error)> DeleteRecipe(
        int recipeId);

    Task<(RecipeResponse? recipeResponse, Error? error)> UpdateRecipe(
        int recipeId,
        RecipeUpdateRequest recipeRequest);
}