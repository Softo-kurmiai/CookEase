﻿
namespace Application.DTOs.User;

public class UserResponse
{
    public int Id { get; set; }

    public required string Name { get; set; }

    public required string Email { get; set; }

    public string? Description { get; set; }

    public string? ProfilePicture { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public uint Version { get; set; }
}