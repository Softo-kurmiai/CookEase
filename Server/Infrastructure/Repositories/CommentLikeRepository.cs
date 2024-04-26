using Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class CommentLikeRepository : GenericRepository<CommentLike>
    {
        private readonly AppDbContext _context;
        private readonly DbSet<CommentLike> _commentLikes;
        public CommentLikeRepository(AppDbContext context) : base(context)
        {
            _context = context;
            _commentLikes = _context.Set<CommentLike>();
        }
    }
}
