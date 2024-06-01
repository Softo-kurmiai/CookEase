using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class CommentLikeRepository(AppDbContext context)
        : GenericRepository<CommentLike>(context), ICommentLikeRepository
    {
        private readonly AppDbContext _context = context;

        public async Task<int> GetCommentLikes(int commentId)
        {
            var count = await _context.CommentLikes
                .Where(cl => cl.CommentId == commentId)
                .CountAsync();

            return count;
        }

        public async Task CreateCommentLike(int commentId, int userId)
        {
            var existingCommentLike = await _context.CommentLikes
                .FirstOrDefaultAsync(cl => cl.CommentId == commentId && cl.UserId == userId);

            if (existingCommentLike != null)
            {
                return;
            }

            var commentLike = new CommentLike
            {
                CommentId = commentId,
                UserId = userId
            };

            _context.CommentLikes.Add(commentLike);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCommentLike(int commentId, int userId)
        {
            var commentLike = await _context.CommentLikes
                .FirstOrDefaultAsync(cl => cl.CommentId == commentId && cl.UserId == userId);

            if (commentLike != null)
            {
                _context.CommentLikes.Remove(commentLike);
                await _context.SaveChangesAsync();
            }
        }
    }
}
