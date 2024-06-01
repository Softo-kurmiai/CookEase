using Infrastructure.Models;

namespace Infrastructure.Interfaces;

public interface ICommentRepository : IGenericRepository<Comment>
{
    Task<List<Comment>?> GetCommentsByRecipeId(
        int recipeId,
        int commentsPerPage,
        int page);

    int GetCommentCountForRecipe(int recipeId);

    Task<decimal> GetRecipeRating(int recipeId);
}