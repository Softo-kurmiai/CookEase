using Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class RecipeRepository : GenericRepository<Recipe>
    {
        private readonly AppDbContext _context;
        private readonly DbSet<Recipe> _recipes;
        public RecipeRepository(AppDbContext context) : base(context)
        {
            _context = context;
            _recipes = _context.Set<Recipe>();
        }
    }
}
