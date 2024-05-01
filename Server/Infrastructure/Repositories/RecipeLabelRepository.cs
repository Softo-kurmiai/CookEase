using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class RecipeLabelRepository : GenericRepository<RecipeCategory>
{
    private readonly DbSet<RecipeCategory> _recipeLabels;

    public RecipeLabelRepository(AppDbContext context) : base(context)
    {
        _recipeLabels = context.Set<RecipeCategory>();
    }
}