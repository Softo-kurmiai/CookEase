using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class FavoriteRecipeRepository : GenericRepository<FavoriteRecipe>
{
    private readonly DbSet<FavoriteRecipe> _favoriteRecipes;

    public FavoriteRecipeRepository(AppDbContext context) : base(context)
    {
        _favoriteRecipes = context.Set<FavoriteRecipe>();
    }
}