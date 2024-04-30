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

    public int GetCommentCountForRecipe(int recipeId)
    {
        return _comments.Count(x => x.RecipeId == recipeId);
    }

    public async Task<Comment?> IncreaseCommentLikeCount(int commentId)
    {
        var comment = await _comments.FindAsync(commentId);
        if (comment is null)
        {
            return null;
        }

        comment.LikeCount++;
        _comments.Update(comment);
        await _context.SaveChangesAsync();
        return comment;
    }

    public async Task<Comment?> DecreaseCommentLikeCount(int commentId)
    {
        var comment = await _comments.FindAsync(commentId);
        if (comment is null)
        {
            return null;
        }

        comment.LikeCount--;
        _comments.Update(comment);
        await _context.SaveChangesAsync();
        return comment;
    }
}