using Application.DTOs.User;

namespace CookEase.Api.Interfaces;

public interface IUserService
{
    Task<List<UserResponse>> GetAll(int countPerPage = 20, int page = 1);

    Task<UserResponse?> GetById(int id);

    Task<UserResponse> Create(UserCreateRequest request);

    Task<UserResponse?> Update(int id, UserUpdateRequest request);

    Task<UserResponse?> Delete(int id);

    Task<UserResponse?> ChangeUserPassword(int userId, string password);
}