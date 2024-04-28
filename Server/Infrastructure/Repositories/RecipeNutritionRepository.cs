using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class RecipeNutritionRepository : GenericRepository<RecipeNutrition>, IRecipeNutritionRepository
{
    private readonly DbSet<RecipeNutrition> _recipeNutrition;

    public RecipeNutritionRepository(AppDbContext context) : base(context)
    {
        _recipeNutrition = context.Set<RecipeNutrition>();
    }

    public async Task<RecipeNutrition?> GetNutritionInfoByRecipeId(int recipeId)
    {
        return await _recipeNutrition.SingleOrDefaultAsync(x => x.RecipeId == recipeId);
    }
}