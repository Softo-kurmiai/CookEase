using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class RecipeLabelRepository : GenericRepository<RecipeLabels>
{
    private readonly DbSet<RecipeLabels> _recipeLabels;

    public RecipeLabelRepository(AppDbContext context) : base(context)
    {
        _recipeLabels = context.Set<RecipeLabels>();
    }
}