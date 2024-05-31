using Infrastructure.Models;

namespace Infrastructure.Interfaces;

public interface IUserRepository : IGenericRepository<User>
{
    Task<User?> GetUserByUsername(string username);
}