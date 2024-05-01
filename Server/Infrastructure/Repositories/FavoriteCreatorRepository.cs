using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class FavoriteCreatorRepository : GenericRepository<FavoriteCreator>
{
    private readonly DbSet<FavoriteCreator> _favoriteCreators;

    public FavoriteCreatorRepository(AppDbContext context) : base(context)
    {
        _favoriteCreators = context.Set<FavoriteCreator>();
    }
}