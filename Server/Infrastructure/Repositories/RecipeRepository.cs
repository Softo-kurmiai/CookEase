using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class RecipeRepository : GenericRepository<Recipe>, IRecipeRepository
{
    private readonly DbSet<Recipe> _recipes;

    public RecipeRepository(AppDbContext context) : base(context)
    {
        _recipes = context.Set<Recipe>();
    }
}