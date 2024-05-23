using System.ComponentModel.DataAnnotations.Schema;

namespace Application.DTOs.User;

public class UserUpdateRequest
{
    public required string Name { get; set; }

    public required string Email { get; set; }

    public required string Password { get; set; }

    public string? Description { get; set; }

    public byte[]? ProfilePicture { get; set; }

    public uint Version { get; set; }
}