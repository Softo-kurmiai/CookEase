using Infrastructure.Models;

namespace Infrastructure.Interfaces;

public interface IRecipeNutritionRepository : IGenericRepository<RecipeNutrition>
{
    Task<RecipeNutrition?> GetNutritionInfoByRecipeId(int recipeId);
}