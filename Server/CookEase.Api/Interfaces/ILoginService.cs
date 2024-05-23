using Application.DTOs.Login;

namespace CookEase.Api.Interfaces;

public interface ILoginService
{
    public Task<LoginResponse> Authenticate(LoginRequest loginRequest);
}
