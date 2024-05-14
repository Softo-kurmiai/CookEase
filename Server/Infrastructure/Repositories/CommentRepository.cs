using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class CommentRepository : GenericRepository<Comment>, ICommentRepository
{
    private readonly DbSet<Comment> _comments;
    private readonly AppDbContext _context;

    public CommentRepository(AppDbContext context) : base(context)
    {
        _comments = context.Set<Comment>();
        _context = context;
    }

    public async Task<List<Comment>?> GetCommentsByRecipeId(
        int recipeId,
        int commentsPerPage,
        int page)
    {
        return await _comments
            .Where(x => x.RecipeId == recipeId)
            .Skip(commentsPerPage * (page - 1))
            .Take(commentsPerPage)
            .ToListAsync();
    }

    // Implementation should be changed
    public async Task<Comment?> IncreaseCommentLikeCount(int commentId)
    {
        var comment = await _comments.FindAsync(commentId);
        if (comment is null)
        {
            return null;
        }

        //comment.LikeCount++;
        _comments.Update(comment);
        await _context.SaveChangesAsync();
        return comment;
    }

    // Implementation should be changed
    public async Task<Comment?> DecreaseCommentLikeCount(int commentId)
    {
        var comment = await _comments.FindAsync(commentId);
        if (comment is null)
        {
            return null;
        }

        //comment.LikeCount--;
        _comments.Update(comment);
        await _context.SaveChangesAsync();
        return comment;
    }

    public int GetCommentCountForRecipe(int recipeId)
    {
        return _comments.Count(x => x.RecipeId == recipeId);
    }

    public async Task<decimal> GetRecipeRating(int recipeId)
    {
        var recipeRatings = await _comments.Where(x => x.RecipeId == recipeId).ToListAsync();
        if (recipeRatings.Count == 0)
        {
            return 0;
        }

        var averageRating = recipeRatings.Average(x => x.Rating);
        return Math.Round(averageRating * 2, MidpointRounding.AwayFromZero) / 2;
    }
    
    // Implementation should be changed
    //public async Task UpdateUserRecipeRating(int userId, int recipeId, decimal newRatingValue)
    //{
    //    var recipeRating = await _recipeRatings.FindAsync(recipeId, userId);
    //    if (recipeRating is null)
    //    {
    //        await Add(new RecipeRating
    //        {
    //            UserId = userId,
    //            RecipeId = recipeId,
    //            Rating = newRatingValue
    //        });
    //        return;
    //    }

    //    recipeRating.Rating = newRatingValue;
    //    await Update(recipeRating);
    //    await _context.SaveChangesAsync();
    //}
}