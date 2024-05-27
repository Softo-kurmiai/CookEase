using Infrastructure.Models;

namespace Infrastructure.Interfaces;

public interface ITokenRepository : IGenericRepository<Token>
{
    public Task<Token?> GetTokenByValue(string? value);
}