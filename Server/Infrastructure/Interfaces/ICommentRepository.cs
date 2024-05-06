using Infrastructure.Models;

namespace Infrastructure.Interfaces;

public interface ICommentRepository : IGenericRepository<Comment>
{
    Task<List<Comment>?> GetCommentsByRecipeId(
        int recipeId,
        int commentsPerPage,
        int page);

    // May be deprecated
    Task<Comment?> IncreaseCommentLikeCount(int commentId);

    // May be deprecated
    Task<Comment?> DecreaseCommentLikeCount(int commentId);

    Task<decimal> GetRecipeRating(int recipeId);
}