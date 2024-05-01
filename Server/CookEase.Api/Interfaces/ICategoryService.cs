using Application.DTOs;
using Application.DTOs.Category;

namespace CookEase.Api.Interfaces;

public interface ICategoryService
{
    Task<Error?> ReplaceRecipeCategories(
        CategoryRequest request);

    Task<(CategoryResponse? categoryResponse, Error? error)> GetCategoriesByRecipeId(
        int recipeId);
}