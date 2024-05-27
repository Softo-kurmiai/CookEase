using Application.DTOs.User;
using Application.DTOs.Token;

namespace Application.DTOs.Login;
public class LoginResponse
{
    public required UserResponse User { get; set; }

    public TokenResponse? Token { get; set; }
}
