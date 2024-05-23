using Infrastructure.Models;

namespace Infrastructure.Interfaces;

public interface IUserRepository : IGenericRepository<User>
{
    public Task<User?> GetUserByUsername(string username);
}