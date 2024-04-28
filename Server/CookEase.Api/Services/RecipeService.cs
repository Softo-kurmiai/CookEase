using Application.DTOs;
using Application.DTOs.Recipe;
using Application.DTOs.RecipeNutrition;
using AutoMapper;
using CookEase.Api.Interfaces;
using Infrastructure.Interfaces;
using Infrastructure.Models;

namespace CookEase.Api.Services;

public class RecipeService : IRecipeService
{
    private readonly IRecipeRepository _recipeRepository;
    private readonly IRecipeNutritionRepository _recipeNutritionRepository;
    private readonly IMapper _mapper;

    public RecipeService(
        IRecipeRepository recipeRepository,
        IRecipeNutritionRepository recipeNutritionRepository,
        IMapper mapper)
    {
        _recipeRepository = recipeRepository;
        _recipeNutritionRepository = recipeNutritionRepository;
        _mapper = mapper;
    }

    public async Task<(RecipeResponse? recipeResponse, Error? error)> CreateRecipe(
        RecipeCreateRequest request)
    {
        var recipe = _mapper.Map<Recipe>(request);
        if (recipe is null)
        {
            return (null, new Error { ErrorMessage = "Something went wrong when mapping Recipe" });
        }
        recipe.CreatedDate = DateTime.UtcNow;

        var recipeNutrition = _mapper.Map<RecipeNutrition>(request.RecipeNutrition);
        if (recipeNutrition is null)
        {
            return (null, new Error { ErrorMessage = "Something went wrong when mapping RecipeNutrition"});
        }
        
        var recipeDbResponse = await _recipeRepository.Add(recipe);
        recipeNutrition.RecipeId = recipeDbResponse.Id;
        var recipeNutritionDbResponse = await _recipeNutritionRepository.Add(recipeNutrition);
        var mappedRecipeResponse =
            _mapper.Map<RecipeResponse>(recipeDbResponse);
        var mappedRecipeNutritionResponse =
            _mapper.Map<RecipeNutritionResponse>(recipeNutritionDbResponse);
        mappedRecipeResponse.RecipeNutrition = mappedRecipeNutritionResponse;
        return (mappedRecipeResponse, null);
    }

    public async Task<(RecipeResponse? recipeResponse, Error? error)> GetRecipeById(
        int recipeId)
    {
        var mappedRecipeNutritionResponse =
            await GetRecipeNutritionByRecipeIdFromDatabase(recipeId);
        var mappedRecipeResponse =
            await GetRecipeByIdFromDatabase(recipeId);
        if (mappedRecipeResponse is null || mappedRecipeNutritionResponse is null)
        {
            return (null,
                new Error
                {
                    ErrorMessage =
                        "Something went wrong when mapping Recipe or RecipeNutrition. Something was not found."
                });
        }

        mappedRecipeResponse.RecipeNutrition = mappedRecipeNutritionResponse;
        return (mappedRecipeResponse, null);
    }

    public async Task<(List<RecipeResponse>? recipeResponses, Error? error)> GetPaginatedRecipes(
        int recipesPerPage, int page)
    {
        var offset = recipesPerPage * page;
        var recipes = await _recipeRepository.ListAsync(offset, recipesPerPage);
        var mappedRecipes = _mapper.Map<List<RecipeResponse>>(recipes);
        if (mappedRecipes is null)
        {
            return (null,
                new Error
                {
                    ErrorMessage =
                        "Something went wrong when mapping Recipe list."
                });
        }

        foreach (var mappedRecipe in mappedRecipes)
        {
            var mappedRecipeNutritionResponse =
                await GetRecipeNutritionByRecipeIdFromDatabase(mappedRecipe.Id);
            if (mappedRecipeNutritionResponse is null)
            {
                return (null,
                    new Error
                    {
                        ErrorMessage =
                            "Something went wrong when mapping RecipeNutrition."
                    });
            }

            mappedRecipe.RecipeNutrition = mappedRecipeNutritionResponse;
        }

        return (mappedRecipes, null);
    }

    public async Task<(RecipeResponse? recipeResponse, Error? error)> DeleteRecipe(
        int recipeId)
    {
        var recipeDbResponse = await _recipeRepository.Delete(recipeId);
        if (recipeDbResponse is null)
        {
            return (null,
                new Error
                {
                    ErrorMessage =
                        $"Recipe with the specified id {recipeId} was not found."
                });
        }

        var recipeNutrition = await _recipeNutritionRepository.GetNutritionInfoByRecipeId(recipeId);
        if (recipeNutrition is null)
        {
            return (null,
                new Error
                {
                    ErrorMessage =
                        $"RecipeNutrition info with the specified recipeId {recipeId} was not found."
                });
        }

        var recipeNutritionDbResponse = await _recipeNutritionRepository.Delete(recipeNutrition.Id);
        var mappedRecipeResponse = _mapper.Map<RecipeResponse>(recipeDbResponse);
        var mappedRecipeNutritionResponse = _mapper.Map<RecipeNutritionResponse>(recipeNutritionDbResponse);
        if (mappedRecipeResponse is null || mappedRecipeNutritionResponse is null)
        {
            return (null,
                new Error
                {
                    ErrorMessage =
                        "Something went wrong when mapping Recipe or RecipeNutrition."
                });
        }

        mappedRecipeResponse.RecipeNutrition = mappedRecipeNutritionResponse;
        return (mappedRecipeResponse, null);
    }

    public async Task<(RecipeResponse? recipeResponse, Error? error)> UpdateRecipe(
        int recipeId,
        RecipeUpdateRequest recipeRequest)
    {
        var mappedRecipeResponse =
            await GetRecipeByIdFromDatabase(recipeId);
        var mappedRecipeNutritionResponse =
            await GetRecipeNutritionByRecipeIdFromDatabase(recipeId);
        if (mappedRecipeResponse is null || mappedRecipeNutritionResponse is null)
        {
            return (null,
                new Error
                {
                    ErrorMessage =
                        "Something went wrong when mapping Recipe or RecipeNutrition. Something was not found."
                });
        }

        mappedRecipeResponse.CommentCount = recipeRequest.CommentCount ?? mappedRecipeResponse.CommentCount;
        mappedRecipeResponse.CookTime = recipeRequest.CookTime ?? mappedRecipeResponse.CookTime;
        mappedRecipeResponse.CreatorId = recipeRequest.CreatorId ?? mappedRecipeResponse.CreatorId;
        mappedRecipeResponse.Description = recipeRequest.Description ?? mappedRecipeResponse.Description;
        mappedRecipeResponse.Difficulty = recipeRequest.Difficulty ?? mappedRecipeResponse.Difficulty;
        mappedRecipeResponse.FavoriteCount = recipeRequest.FavoriteCount ?? mappedRecipeResponse.FavoriteCount;
        mappedRecipeResponse.Image = recipeRequest.Image ?? mappedRecipeResponse.Image;
        mappedRecipeResponse.Ingredients = recipeRequest.Ingredients ?? mappedRecipeResponse.Ingredients;
        mappedRecipeResponse.Instructions = recipeRequest.Instructions ?? mappedRecipeResponse.Instructions;
        mappedRecipeResponse.Name = recipeRequest.Name ?? mappedRecipeResponse.Name;
        mappedRecipeResponse.PrepTime = recipeRequest.PrepTime ?? mappedRecipeResponse.PrepTime;
        mappedRecipeResponse.Rating = recipeRequest.Rating ?? mappedRecipeResponse.Rating;
        mappedRecipeResponse.Servings = recipeRequest.Servings ?? mappedRecipeResponse.Servings;
        mappedRecipeResponse.UpdatedDate = DateTime.UtcNow;
        mappedRecipeResponse.ViewCount = recipeRequest.ViewCount ?? mappedRecipeResponse.ViewCount;
        mappedRecipeNutritionResponse.Calories =
            recipeRequest.RecipeNutrition?.Calories ?? mappedRecipeNutritionResponse.Calories;
        mappedRecipeNutritionResponse.Carbs =
            recipeRequest.RecipeNutrition?.Carbs ?? mappedRecipeNutritionResponse.Carbs;
        mappedRecipeNutritionResponse.Fat =
            recipeRequest.RecipeNutrition?.Fat ?? mappedRecipeNutritionResponse.Fat;
        mappedRecipeNutritionResponse.Fiber =
            recipeRequest.RecipeNutrition?.Fiber ?? mappedRecipeNutritionResponse.Fiber;
        mappedRecipeNutritionResponse.Protein =
            recipeRequest.RecipeNutrition?.Protein ?? mappedRecipeNutritionResponse.Protein;
        mappedRecipeNutritionResponse.Sugar =
            recipeRequest.RecipeNutrition?.Sugar ?? mappedRecipeNutritionResponse.Sugar;

        var recipeToUpdate = _mapper.Map<Recipe>(mappedRecipeResponse);
        var recipeDbResponse = await _recipeRepository.Update(recipeToUpdate);
        var recipeNutritionToUpdate = _mapper.Map<RecipeNutrition>(mappedRecipeNutritionResponse);
        var recipeNutritionDbResponse = await _recipeNutritionRepository.Update(recipeNutritionToUpdate);

        var mappedRecipeDbResponse = _mapper.Map<RecipeResponse>(recipeDbResponse);
        var mappedRecipeNutritionDbResponse = _mapper.Map<RecipeNutritionResponse>(recipeNutritionDbResponse);
        mappedRecipeDbResponse.RecipeNutrition = mappedRecipeNutritionDbResponse;

        return (mappedRecipeDbResponse, null);
    }

    private async Task<RecipeResponse?> GetRecipeByIdFromDatabase(
        int recipeId)
    {
        var recipe = await _recipeRepository.GetById(recipeId);
        var mappedRecipeResponse = _mapper.Map<RecipeResponse>(recipe);

        return mappedRecipeResponse;
    }

    private async Task<RecipeNutritionResponse?> GetRecipeNutritionByRecipeIdFromDatabase(
        int recipeId)
    {
        var recipeNutrition = await _recipeNutritionRepository.GetNutritionInfoByRecipeId(recipeId);
        var mappedRecipeNutritionResponse = _mapper.Map<RecipeNutritionResponse>(recipeNutrition);

        return mappedRecipeNutritionResponse;
    }
}