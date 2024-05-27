
namespace Application.DTOs.Login;
public class LoginRequest
{
    public required string Username {  get; set; }
    public required string Password { get; set; }
    public String? Token { get; set; }
}
