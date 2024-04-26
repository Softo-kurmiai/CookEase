using Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class CommentRepository : GenericRepository<Comment>
    {
        private readonly AppDbContext _context;
        private readonly DbSet<Comment> _comments;
        public CommentRepository(AppDbContext context) : base(context)
        {
            _context = context;
            _comments = _context.Set<Comment>();
        }
    }
}
