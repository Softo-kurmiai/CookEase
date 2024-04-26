using Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class CollectionRecipeRepository : GenericRepository<Collection>
    {
        private readonly AppDbContext _context;
        private readonly DbSet<CollectionRecipe> _collectionRecipes;
        public CollectionRecipeRepository(AppDbContext context) : base(context)
        {
            _context = context;
            _collectionRecipes = _context.Set<CollectionRecipe>();
        }
    }
}
