using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class LabelRepository : GenericRepository<Label>
{
    private readonly DbSet<Label> _labels;

    public LabelRepository(AppDbContext context) : base(context)
    {
        _labels = context.Set<Label>();
    }
}