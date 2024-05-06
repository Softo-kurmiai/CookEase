using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class UserRepository : GenericRepository<User>, IUserRepository
{
    private readonly DbSet<User> _users;

    public UserRepository(AppDbContext context) : base(context) 
    {
        _users = context.Set<User>();
    }

    public async Task<User?> GetUserByUsername(string username)
    {
        return await _users.Where(x => x.Name == username).SingleOrDefaultAsync();
    }
}