using Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class LabelRepository : GenericRepository<Label>
    {
        private readonly AppDbContext _context;
        private readonly DbSet<Label> _labels;
        public LabelRepository(AppDbContext context) : base(context)
        {
            _context = context;
            _labels = _context.Set<Label>();
        }
    }
}
