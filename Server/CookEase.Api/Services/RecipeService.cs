using Application.DTOs;
using Application.DTOs.Recipe;
using Application.DTOs.RecipeNutrition;
using Application.Enums;
using AutoMapper;
using CookEase.Api.Interfaces;
using Infrastructure.Interfaces;
using Infrastructure.Models;

namespace CookEase.Api.Services;

public class RecipeService : IRecipeService
{
    private readonly IRecipeRepository _recipeRepository;
    private readonly IRecipeNutritionRepository _recipeNutritionRepository;
    private readonly IRecipeRatingRepository _recipeRatingRepository;
    private readonly IMapper _mapper;

    public RecipeService(
        IRecipeRepository recipeRepository,
        IRecipeNutritionRepository recipeNutritionRepository,
        IRecipeRatingRepository recipeRatingRepository,
        IMapper mapper)
    {
        _recipeRepository = recipeRepository;
        _recipeNutritionRepository = recipeNutritionRepository;
        _recipeRatingRepository = recipeRatingRepository;
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
        var offset = recipesPerPage * (page - 1);
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

    public async Task<List<RecipeResponse>> GetNumberOfTopLikedRecipes(
        int maxNumberOfRecipes)
    {
        var recipes = await _recipeRepository.GetNumberOfTopLikedRecipes(maxNumberOfRecipes);
        var mappedRecipes = _mapper.Map<List<RecipeResponse>>(recipes);
        return mappedRecipes ?? [];
    }

    public async Task<List<RecipeResponse>> GetNumberOfRandomRecipes(
        int maxNumberOfRecipes)
    {
        var recipes = await _recipeRepository.GetNumberOfRandomRecipes(maxNumberOfRecipes);
        var mappedRecipes = _mapper.Map<List<RecipeResponse>>(recipes);
        return mappedRecipes ?? [];
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
        mappedRecipeResponse.CookTime = recipeRequest.CookTime;
        mappedRecipeResponse.CreatorId = recipeRequest.CreatorId;
        mappedRecipeResponse.Description = recipeRequest.Description;
        mappedRecipeResponse.Difficulty = recipeRequest.Difficulty;
        mappedRecipeResponse.Image = recipeRequest.Image;
        mappedRecipeResponse.Ingredients = recipeRequest.Ingredients;
        mappedRecipeResponse.Instructions = recipeRequest.Instructions;
        mappedRecipeResponse.Name = recipeRequest.Name;
        mappedRecipeResponse.PrepTime = recipeRequest.PrepTime;
        mappedRecipeResponse.Servings = recipeRequest.Servings;
        mappedRecipeResponse.UpdatedDate = DateTime.UtcNow;
        mappedRecipeNutritionResponse.Calories = recipeRequest.RecipeNutrition.Calories;
        mappedRecipeNutritionResponse.Carbs = recipeRequest.RecipeNutrition.Carbs;
        mappedRecipeNutritionResponse.Fat = recipeRequest.RecipeNutrition.Fat;
        mappedRecipeNutritionResponse.Fiber = recipeRequest.RecipeNutrition.Fiber;
        mappedRecipeNutritionResponse.Protein = recipeRequest.RecipeNutrition.Protein;
        mappedRecipeNutritionResponse.Sugar = recipeRequest.RecipeNutrition.Sugar;

        var recipeToUpdate = _mapper.Map<Recipe>(mappedRecipeResponse);
        var recipeDbResponse = await _recipeRepository.Update(recipeToUpdate);
        var recipeNutritionToUpdate = _mapper.Map<RecipeNutrition>(mappedRecipeNutritionResponse);
        var recipeNutritionDbResponse = await _recipeNutritionRepository.Update(recipeNutritionToUpdate);

        var mappedRecipeDbResponse = _mapper.Map<RecipeResponse>(recipeDbResponse);
        var mappedRecipeNutritionDbResponse = _mapper.Map<RecipeNutritionResponse>(recipeNutritionDbResponse);
        mappedRecipeDbResponse.RecipeNutrition = mappedRecipeNutritionDbResponse;

        return (mappedRecipeDbResponse, null);
    }

    public async Task<(List<RecipeResponse>? creatorRecipes, Error? error)> GetRecipesByCreatorId(
        int creatorId)
    {
        var recipes = await _recipeRepository.GetRecipesByCreatorId(creatorId);
        var mappedRecipes = _mapper.Map<List<RecipeResponse>>(recipes);
        if (mappedRecipes is null)
        {
            return (null,
                new Error
                { 
                    ErrorMessage = $"Something went wrong when mapping Recipe list. " +
                                   $"No recipes for given creatorId {creatorId} were found."
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
                        ErrorMessage = $"Something went wrong when mapping RecipeNutrition. " +
                                       $"Recipe nutrition information was not found for recipe {mappedRecipe.Id}."
                    });
            }

            mappedRecipe.RecipeNutrition = mappedRecipeNutritionResponse;
        }

        return (mappedRecipes, null);
    }

    public async Task<Error?> IncreaseRecipeMetric(
        int recipeId,
        RecipeMetricsUpdateRequest updateRequest)
    {
        var dbResponse = updateRequest.Metric switch
        {
            RecipeMetrics.IncreaseViewCount => await _recipeRepository.IncreaseRecipeViewCount(recipeId),
            RecipeMetrics.IncreaseFavoriteCount => await _recipeRepository.IncreaseRecipeFavoriteCount(recipeId),
            RecipeMetrics.DecreaseFavoriteCount => await _recipeRepository.DecreaseRecipeFavoriteCount(recipeId),
            _ => throw new ArgumentOutOfRangeException($"The specified RecipeMetric {updateRequest.Metric} is not supported.")
        };
        if (dbResponse is null)
        {
            return new Error { ErrorMessage = $"Recipe with the specified id {recipeId} was not found." };
        }

        return null;
    }

    public async Task<decimal> GetRecipeRating(
        int recipeId)
    {
        return await _recipeRatingRepository.GetRecipeRating(recipeId);
    }

    public async Task<decimal> GetUserRecipeRating(
        int userId,
        int recipeId)
    {
        return await _recipeRatingRepository.GetUserRecipeRating(userId, recipeId);
    }

    public async Task UpdateUserRecipeRating(
        int userId,
        int recipeId,
        decimal newRatingValue)
    {
        await _recipeRatingRepository.UpdateUserRecipeRating(userId, recipeId, newRatingValue);
    }

    private async Task<RecipeResponse?> GetRecipeByIdFromDatabase(
        int recipeId)
    {
        var recipe = await _recipeRepository.GetById(recipeId);
        if (recipe is not null)
        {
            await _recipeRepository.Detach(recipe);
        }
        var mappedRecipeResponse = _mapper.Map<RecipeResponse>(recipe);

        return mappedRecipeResponse;
    }

    private async Task<RecipeNutritionResponse?> GetRecipeNutritionByRecipeIdFromDatabase(
        int recipeId)
    {
        var recipeNutrition = await _recipeNutritionRepository.GetNutritionInfoByRecipeId(recipeId);
        if (recipeNutrition is not null)
        {
            await _recipeNutritionRepository.Detach(recipeNutrition);
        }
        var mappedRecipeNutritionResponse = _mapper.Map<RecipeNutritionResponse>(recipeNutrition);

        return mappedRecipeNutritionResponse;
    }
}