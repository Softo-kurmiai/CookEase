using Application.DTOs;
using Application.DTOs.Category;
using AutoMapper;
using CookEase.Api.Interfaces;
using Infrastructure.Interfaces;
using Infrastructure.Models;

namespace CookEase.Api.Services;

public class CategoryService : ICategoryService
{
    private readonly IRecipeCategoryRepository _recipeCategoryRepository;
    private readonly IMapper _mapper;

    public CategoryService(
        IRecipeCategoryRepository recipeCategoryRepository,
        IMapper mapper)
    {
        _recipeCategoryRepository = recipeCategoryRepository;
        _mapper = mapper;
    }

    public async Task<Error?> ReplaceRecipeCategories(
        CategoryRequest request)
    {
        var mappedRecipeCategories = _mapper.Map<List<RecipeCategory>>(request);
        if (!mappedRecipeCategories.Any() || mappedRecipeCategories is null)
        {
            return new Error { ErrorMessage = "Mapping of RecipeCategories failed." };
        }

        await _recipeCategoryRepository.ReplaceRecipeCategories(request.RecipeId, mappedRecipeCategories);
        return null;
    }

    public async Task<(CategoryResponse? categoryResponse, Error? error)> GetCategoriesByRecipeId(
        int recipeId)
    {
        var categoriesDbResponse = await _recipeCategoryRepository.GetCategoriesByRecipeId(recipeId);
        var mappedCategoriesResponse = _mapper.Map<CategoryResponse>(categoriesDbResponse);
        if (mappedCategoriesResponse is null)
        {
            return (null,
                new Error
                {
                    ErrorMessage = $"No recipe categories were found for id {recipeId} or mapping failed"
                });
        }

        return (mappedCategoriesResponse, null);
    }
}