using Application.Enums;
using Infrastructure.Models;

namespace Infrastructure.Interfaces;

public interface IRecipeCategoryRepository : IGenericRepository<RecipeCategory>
{
    Task AddReplaceRecipeCategories(int recipeId, List<RecipeCategory> newCategories);

    Task<List<RecipeCategory>?> GetCategoriesByRecipeId(int recipeId);

    Task<List<int>?> GetRecipeIdsByCategory(Category category, int offset, int limit);
}