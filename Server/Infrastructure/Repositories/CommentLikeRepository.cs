using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class CommentLikeRepository : GenericRepository<CommentLike>
{
    private readonly DbSet<CommentLike> _commentLikes;

    public CommentLikeRepository(AppDbContext context) : base(context)
    {
        _commentLikes = context.Set<CommentLike>();
    }
}