using Application.DTOs;
using Application.DTOs.Category;
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
    private readonly ICommentService _commentService;
    private readonly ICategoryService _categoryService;
    private readonly IRecipeCategoryRepository _recipeCategoryRepository;
    private readonly IMapper _mapper;

    public RecipeService(
        IRecipeRepository recipeRepository,
        IRecipeNutritionRepository recipeNutritionRepository,
        ICommentService commentService,
        ICategoryService categoryService,
        IRecipeCategoryRepository recipeCategoryRepository,
        IMapper mapper)
    {
        _recipeRepository = recipeRepository;
        _recipeNutritionRepository = recipeNutritionRepository;
        _commentService = commentService;
        _categoryService = categoryService;
        _recipeCategoryRepository = recipeCategoryRepository;
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
        var recipeCategoriesDbResponse = await _categoryService.AddReplaceRecipeCategories(new CategoryRequest
        {
            RecipeId = recipeDbResponse.Id,
            Categories = request.Categories,
        });
        if (recipeCategoriesDbResponse is not null)
        {
            return (null, recipeCategoriesDbResponse);
        }

        var mappedRecipeResponse =
            _mapper.Map<RecipeResponse>(recipeDbResponse);
        var mappedRecipeNutritionResponse =
            _mapper.Map<RecipeNutritionResponse>(recipeNutritionDbResponse);
        mappedRecipeResponse.RecipeNutrition = mappedRecipeNutritionResponse;
        mappedRecipeResponse.Categories = request.Categories;
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

        var categories = await _recipeCategoryRepository.GetCategoriesByRecipeId(recipeId);
        if (categories is null || categories.Count == 0)
        {
            return (null,
                new Error
                {
                    ErrorMessage = $"Something went wrong when getting categories for the recipe {recipeId}."
                });
        }

        mappedRecipeResponse.RecipeNutrition = mappedRecipeNutritionResponse;
        (mappedRecipeResponse.CommentCount, var error) = _commentService.GetRecipeCommentsCount(recipeId);

        if (error is not null)
        {
            return (null,
                new Error
                {
                    ErrorMessage = $"Could not retrieve recipe {recipeId} comments"
                });
        }

        await _recipeRepository.IncreaseRecipeViewCount(recipeId);

        mappedRecipeResponse.Rating = await _commentService.GetRecipeRating(recipeId);
        mappedRecipeResponse.Categories = categories.Select(x => x.Category).ToList();
        return (mappedRecipeResponse, null);
    }

    public async Task<(List<RecipeCardResponse>? recipeResponses, Error? error)> GetPaginatedRecipeCards(
        int recipesPerPage, int page)
    {
        var offset = recipesPerPage * (page - 1);
        var recipes = await _recipeRepository.ListAsync(offset, recipesPerPage);
        var mappedRecipes = _mapper.Map<List<RecipeCardResponse>>(recipes);
        if (mappedRecipes is null)
        {
            return (null,
                new Error
                {
                    ErrorMessage =
                        "Something went wrong when mapping Recipe list."
                });
        }

        (mappedRecipes, var error) = await FillMappedRecipes(mappedRecipes);

        return (mappedRecipes, error);
    }

    public async Task<List<RecipeCardResponse>> GetNumberOfTopLikedRecipeCards(
        int maxNumberOfRecipes)
    {
        var recipes = await _recipeRepository.GetNumberOfTopLikedRecipes(maxNumberOfRecipes);
        var mappedRecipes = _mapper.Map<List<RecipeCardResponse>>(recipes);

        (mappedRecipes, _) = await FillMappedRecipes(mappedRecipes);

        return mappedRecipes ?? [];
    }

    public async Task<List<RecipeCardResponse>> GetNumberOfRandomRecipeCards(
        int maxNumberOfRecipes)
    {
        var recipes = await _recipeRepository.GetNumberOfRandomRecipes(maxNumberOfRecipes);
        var mappedRecipes = _mapper.Map<List<RecipeCardResponse>>(recipes);

        (mappedRecipes, _) = await FillMappedRecipes(mappedRecipes);

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
        var recipeCategoriesDbResponse = await _categoryService.AddReplaceRecipeCategories(new CategoryRequest
        {
            RecipeId = recipeId,
            Categories = recipeRequest.Categories,
        });
        if (recipeCategoriesDbResponse is not null)
        {
            return (null, recipeCategoriesDbResponse);
        }

        var mappedRecipeDbResponse = _mapper.Map<RecipeResponse>(recipeDbResponse);
        var mappedRecipeNutritionDbResponse = _mapper.Map<RecipeNutritionResponse>(recipeNutritionDbResponse);
        mappedRecipeDbResponse.RecipeNutrition = mappedRecipeNutritionDbResponse;
        mappedRecipeDbResponse.Categories = recipeRequest.Categories;

        return (mappedRecipeDbResponse, null);
    }

    public async Task<(List<RecipeCardResponse>? creatorRecipes, Error? error)> GetRecipeCardsByCreatorId(
        int creatorId,
        int recipesPerPage,
        int page)
    {
        var offset = recipesPerPage * (page - 1);
        var recipes = await _recipeRepository.GetRecipesByCreatorId(creatorId, offset, recipesPerPage);
        var mappedRecipes = _mapper.Map<List<RecipeCardResponse>>(recipes);
        if (mappedRecipes is null)
        {
            return (null,
                new Error
                { 
                    ErrorMessage = $"Something went wrong when mapping Recipe list. " +
                                   $"No recipes for given creatorId {creatorId} were found."
                });
        }

        (mappedRecipes, var error) = await FillMappedRecipes(mappedRecipes);

        return (mappedRecipes, error);
    }

    public async Task<(List<RecipeCardResponse>? creatorRecipes, Error? error)> GetRecipeCardsByCategoryName(
        Category categoryName,
        int recipesPerPage,
        int page)
    {
        var offset = recipesPerPage * (page - 1);
        var recipeIds = await _recipeCategoryRepository
            .GetRecipeIdsByCategory(categoryName, offset, recipesPerPage);
        if (recipeIds is null || recipeIds.Count == 0)
        {
            return (null,
                new Error
                {
                    ErrorMessage = $"No recipes were found for the specified category {categoryName}."
                });
        }
        var recipes = await _recipeRepository.GetRecipesByRecipeIds(recipeIds);
        var mappedRecipes = _mapper.Map<List<RecipeCardResponse>>(recipes);
        if (mappedRecipes is null)
        {
            return (null,
                new Error
                {
                    ErrorMessage = "Something went wrong when mapping Recipe list."
                });
        }

        (mappedRecipes, var error) = await FillMappedRecipes(mappedRecipes);

        return (mappedRecipes, error);
    }

    public async Task<(List<RecipeCardResponse>? recipesFound, Error? error)> SearchRecipeCardsByName(
        string searchTerm,
        int recipesPerPage,
        int page)
    {
        var offset = recipesPerPage * (page - 1);
        var recipes = await _recipeRepository
            .SearchRecipesByName(searchTerm, offset, recipesPerPage);
        var mappedRecipes = _mapper.Map<List<RecipeCardResponse>>(recipes);
        if (mappedRecipes is null)
        {
            return (null,
                new Error
                {
                    ErrorMessage = $"Something went wrong when mapping Recipe list. " +
                                   $"No recipes for given search term ({searchTerm}) were found."
                });
        }

        (mappedRecipes, var error) = await FillMappedRecipes(mappedRecipes);

        return (mappedRecipes, error);
    }

    public async Task<Error?> IncreaseRecipeMetric(
        int recipeId,
        RecipeMetricsUpdateRequest updateRequest)
    {
        var dbResponse = updateRequest.Metric switch
        {
            RecipeMetrics.IncreaseViewCount => await _recipeRepository.IncreaseRecipeViewCount(recipeId), // already deprecated (used in GetRecipeById)
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

    public int GetTotalNumberOfRecipes()
    {
        return _recipeRepository.GetNumberOfRecipesInDatabase();
    }

    public int GetTotalNumberOfCreatorRecipes(int creatorId)
    {
        return _recipeRepository.GetNumberOfCreatorRecipesInDatabase(creatorId);
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

    private async Task<(List<RecipeCardResponse>?, Error? error)> FillMappedRecipes(List<RecipeCardResponse>? mappedRecipes)
    {
        if (mappedRecipes == null)
        {
            return (mappedRecipes, null);
        }

        foreach (var recipe in mappedRecipes)
        {
            recipe.Rating = await _commentService.GetRecipeRating(recipe.Id);
            (recipe.CommentCount, _ ) = _commentService.GetRecipeCommentsCount(recipe.Id);
        }
        return (mappedRecipes, null);
    }
}