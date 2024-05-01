using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class CollectionRepository : GenericRepository<Collection>
{
    private readonly DbSet<Collection> _collections;

    public CollectionRepository(AppDbContext context) : base(context)
    {
        _collections = context.Set<Collection>();
    }
}