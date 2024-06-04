using Application.DTOs.Token;

namespace CookEase.Api.Interfaces;

public interface ITokenService
{
    public Task<TokenResponse> Create(int UserId, int expirationTimerMinutes);
}
