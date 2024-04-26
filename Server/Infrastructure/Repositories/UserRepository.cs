using Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class UserRepository : GenericRepository<User>
    {
        private readonly AppDbContext _context;
        private readonly DbSet<User> _users;
        public UserRepository(AppDbContext context) : base(context) 
        {
            _context = context;
            _users = _context.Set<User>();
        }
    }
}
