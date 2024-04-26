using Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class CollectionRepository : GenericRepository<Collection>
    {
        private readonly AppDbContext _context;
        private readonly DbSet<Collection> _collections;
        public CollectionRepository(AppDbContext context) : base(context)
        {
            _context = context;
            _collections = _context.Set<Collection>();
        }
    }
}
