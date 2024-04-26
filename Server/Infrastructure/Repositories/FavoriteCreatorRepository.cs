using Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class FavoriteCreatorRepository : GenericRepository<FavoriteCreator>
    {
        private readonly AppDbContext _context;
        private readonly DbSet<FavoriteCreator> _favoriteCreators;
        public FavoriteCreatorRepository(AppDbContext context) : base(context)
        {
            _context = context;
            _favoriteCreators = _context.Set<FavoriteCreator>();
        }
    }
}
