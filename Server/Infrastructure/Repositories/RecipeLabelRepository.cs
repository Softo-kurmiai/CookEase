using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class RecipeLabelRepository : GenericRepository<RecipeLabels>
    {
        private readonly AppDbContext _context;
        private readonly DbSet<RecipeLabels> _recipeLabels;
        public RecipeLabelRepository(AppDbContext context) : base(context)
        {
            _context = context;
            _recipeLabels = _context.Set<RecipeLabels>();
        }
    }
}
