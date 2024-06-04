namespace Application.DTOs.User;

public class UserUpdateRequest
{
    public required string Name { get; set; }

    public required string Email { get; set; }

    public string? Password { get; set; }

    public string? Description { get; set; }

    public string? ProfilePicture { get; set; }

    public uint Version { get; set; }
}