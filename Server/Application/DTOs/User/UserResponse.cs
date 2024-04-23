namespace Application.DTOs.User;

public class UserResponse : UserCreateRequest
{
    public required int Id { get; set; }
}