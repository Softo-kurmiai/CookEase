using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class UserRepository : GenericRepository<User>, IUserRepository
{
    private readonly DbSet<User> _users;
    private readonly AppDbContext _context;

    public UserRepository(AppDbContext context) : base(context) 
    {
        _users = context.Set<User>();
        _context = context;
    }

    public async Task<User?> GetUserByUsername(string username)
    {
        return await _users.Where(x => x.Name == username).SingleOrDefaultAsync();
    }

    public async Task<User?> ChangeUserPassword(int userId, string password)
    {
        var user = await _users.FindAsync(userId);
        if (user is null)
        {
            return null;
        }

        user.Password = password;
        _users.Update(user);
        await _context.SaveChangesAsync();
        return user;
    }
}