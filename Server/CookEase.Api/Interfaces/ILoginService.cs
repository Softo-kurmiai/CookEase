using Application.DTOs.Login;

namespace CookEase.Api.Interfaces;

public interface ILoginService
{
    public LoginResponse? Authenticate(LoginRequest loginRequest);
}
