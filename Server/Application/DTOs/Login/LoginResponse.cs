
using Application.DTOs.User;

namespace Application.DTOs.Login;
public class LoginResponse
{
    public required UserResponse User { get; set; }
}
