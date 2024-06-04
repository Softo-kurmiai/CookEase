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

    public async Task<List<Recipe>?> GetRecipesByRecipeIds(List<int> recipeIds)
    {
        return await _recipes.Where(x => recipeIds.Contains(x.Id)).ToListAsync();
    }

    public async Task<List<Recipe>?> GetRecipesByCreatorId(int id, int offset, int limit)
    {
        return await _recipes
            .Where(x => x.CreatorId == id)
            .Skip(offset)
            .Take(limit)
            .ToListAsync();
    }

    public async Task<List<Recipe>?> SearchRecipesByName(string searchTerm, int offset, int limit)
    {
        return await _recipes
            .Where(x => x.Name.ToLower().Contains(searchTerm.ToLower()))
            .Skip(offset)
            .Take(limit)
            .ToListAsync();
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

    // Current implementation will return top viewed recipes
    public async Task<List<Recipe>> GetNumberOfTopLikedRecipes(int maxNumberOfRecipes)
    {
        return await _recipes
            .OrderByDescending(x => x.ViewCount)
            .ThenByDescending(x => x.CreatedDate)
            .Take(maxNumberOfRecipes)
            .ToListAsync() ?? [];
    }

    public async Task<List<Recipe>> GetNumberOfRandomRecipes(int maxNumberOfRecipes)
    {
        return await _recipes
            .OrderBy(x => Guid.NewGuid())
            .Take(maxNumberOfRecipes)
            .ToListAsync() ?? [];
    }

    public int GetNumberOfRecipesInDatabase()
    {
        return _recipes.Count();
    }

    public int GetNumberOfCreatorRecipesInDatabase(int creatorId)
    {
        return _recipes.Count(x => x.CreatorId == creatorId);
    }
}