using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class CollectionRecipeRepository : GenericRepository<Collection>
{
    private readonly DbSet<CollectionRecipe> _collectionRecipes;

    public CollectionRecipeRepository(AppDbContext context) : base(context)
    {
        _collectionRecipes = context.Set<CollectionRecipe>();
    }
}