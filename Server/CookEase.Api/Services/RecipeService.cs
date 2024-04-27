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
}