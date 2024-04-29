using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class RecipeRatingRepository : GenericRepository<RecipeRating>, IRecipeRatingRepository
{
    private readonly DbSet<RecipeRating> _recipeRatings;
    private readonly AppDbContext _context;

    public RecipeRatingRepository(AppDbContext context) : base(context)
    {
        _recipeRatings = context.Set<RecipeRating>();
        _context = context;
    }

    public async Task<decimal> GetRecipeRating(int recipeId)
    {
        var recipeRatings = await _recipeRatings.Where(x => x.RecipeId == recipeId).ToListAsync();
        if (recipeRatings.Count == 0)
        {
            return 0;
        }

        var averageRating = recipeRatings.Average(x => x.Rating);
        return Math.Round(averageRating * 2, MidpointRounding.AwayFromZero) / 2;
    }

    public async Task<decimal> GetUserRecipeRating(int userId, int recipeId)
    {
        var recipeRating = await _recipeRatings.FindAsync(recipeId, userId);
        if (recipeRating is null)
        {
            return 0;
        }

        return recipeRating.Rating;
    }

    public async Task UpdateUserRecipeRating(int userId, int recipeId, decimal newRatingValue)
    {
        var recipeRating = await _recipeRatings.FindAsync(recipeId, userId);
        if (recipeRating is null)
        {
            await Add(new RecipeRating
            {
                UserId = userId,
                RecipeId = recipeId,
                Rating = newRatingValue
            });
            return;
        }

        recipeRating.Rating = newRatingValue;
        await Update(recipeRating);
        await _context.SaveChangesAsync();
    }
}