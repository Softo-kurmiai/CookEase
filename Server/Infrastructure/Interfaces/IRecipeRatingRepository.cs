using Infrastructure.Models;

namespace Infrastructure.Interfaces;

public interface IRecipeRatingRepository : IGenericRepository<RecipeRating>
{
    Task<decimal> GetRecipeRating(int recipeId);

    Task<decimal> GetUserRecipeRating(int userId, int recipeId);

    Task UpdateUserRecipeRating(int userId, int recipeId, decimal newRatingValue);
}