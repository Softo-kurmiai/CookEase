using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class CommentRepository : GenericRepository<Comment>
{
    private readonly DbSet<Comment> _comments;

    public CommentRepository(AppDbContext context) : base(context)
    {
        _comments = context.Set<Comment>();
    }
}