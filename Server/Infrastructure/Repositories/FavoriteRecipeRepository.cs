using Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class FavoriteRecipeRepository : GenericRepository<FavoriteRecipe>
    {
        private readonly AppDbContext _context;
        private readonly DbSet<FavoriteRecipe> _favoriteRecipes;
        public FavoriteRecipeRepository(AppDbContext context) : base(context)
        {
            _context = context;
            _favoriteRecipes = _context.Set<FavoriteRecipe>();
        }
    }
}
