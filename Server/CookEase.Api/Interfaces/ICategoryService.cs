using Application.DTOs;
using Application.DTOs.Category;
using Application.Enums;

namespace CookEase.Api.Interfaces;

public interface ICategoryService
{
    Task<Error?> AddReplaceRecipeCategories(
        CategoryRequest request);

    Task<(CategoryResponse? categoryResponse, Error? error)> GetCategoriesByRecipeId(
        int recipeId);

    List<Category> GetAllCategories();
}