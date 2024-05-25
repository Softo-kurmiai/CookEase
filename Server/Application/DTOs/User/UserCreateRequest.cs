
namespace Application.DTOs.User;

public class UserCreateRequest
{
    public required string Name { get; set; }

    public required string Email { get; set; }

    public required string Password { get; set; }

    public string? Description { get; set; }

    public string? ProfilePicture { get; set; }
}