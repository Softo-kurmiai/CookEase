using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class RecipeRepository : GenericRepository<Recipe>, IRecipeRepository
{
    private readonly DbSet<Recipe> _recipes;
    private readonly AppDbContext _context;

    public RecipeRepository(AppDbContext context) : base(context)
    {
        _context = context;
        _recipes = context.Set<Recipe>();
    }

    public async Task<List<Recipe>?> GetRecipesByCreatorId(int id)
    {
        return await _recipes.Where(x => x.CreatorId == id).ToListAsync();
    }

    public async Task<Recipe?> IncreaseRecipeViewCount(int recipeId)
    {
        var recipe = await _recipes.FindAsync(recipeId);
        if (recipe is null)
        {
            return null;
        }

        recipe.ViewCount++;
        _recipes.Update(recipe);
        await _context.SaveChangesAsync();
        return recipe;
    }

    public async Task<Recipe?> IncreaseRecipeFavoriteCount(int recipeId)
    {
        var recipe = await _recipes.FindAsync(recipeId);
        if (recipe is null)
        {
            return null;
        }

        recipe.FavoriteCount++;
        _recipes.Update(recipe);
        await _context.SaveChangesAsync();
        return recipe;
    }

    public async Task<Recipe?> DecreaseRecipeFavoriteCount(int recipeId)
    {
        var recipe = await _recipes.FindAsync(recipeId);
        if (recipe is null)
        {
            return null;
        }

        recipe.FavoriteCount--;
        _recipes.Update(recipe);
        await _context.SaveChangesAsync();
        return recipe;
    }
}