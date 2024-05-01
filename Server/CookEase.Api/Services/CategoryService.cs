using Application.DTOs;
using Application.DTOs.Category;
using Application.Enums;
using CookEase.Api.Interfaces;
using Infrastructure.Interfaces;
using Infrastructure.Models;

namespace CookEase.Api.Services;

public class CategoryService : ICategoryService
{
    private readonly IRecipeCategoryRepository _recipeCategoryRepository;

    public CategoryService(IRecipeCategoryRepository recipeCategoryRepository)
    {
        _recipeCategoryRepository = recipeCategoryRepository;
    }

    public async Task<Error?> ReplaceRecipeCategories(
        CategoryRequest request)
    {
        var mappedRecipeCategories = new List<RecipeCategory>();
        foreach (var category in request.Categories)
        {
            mappedRecipeCategories.Add(new RecipeCategory
            {
                RecipeId = request.RecipeId,
                Category = category,
            });
        }
        if (!mappedRecipeCategories.Any())
        {
            return new Error { ErrorMessage = "No recipe categories given. The list should at least have one category." };
        }

        await _recipeCategoryRepository.ReplaceRecipeCategories(request.RecipeId, mappedRecipeCategories);
        return null;
    }

    public async Task<(CategoryResponse? categoryResponse, Error? error)> GetCategoriesByRecipeId(
        int recipeId)
    {
        var categoriesDbResponse = await _recipeCategoryRepository.GetCategoriesByRecipeId(recipeId);
        if (categoriesDbResponse is null)
        {
            return (null,
                new Error
                {
                    ErrorMessage = $"No recipe categories were found for id {recipeId}"
                });
        }
        var mappedCategoriesResponse = new CategoryResponse
        {
            RecipeId = recipeId,
            Categories = categoriesDbResponse.Select(x => x.Category).ToList(),
        };

        return (mappedCategoriesResponse, null);
    }

    public List<Category> GetAllCategories()
    {
        return Enum.GetValues<Category>().ToList();
    }
}