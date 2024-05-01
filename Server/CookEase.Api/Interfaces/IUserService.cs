using Application.DTOs.User;

namespace CookEase.Api.Interfaces;

public interface IUserService
{
    List<UserResponse> GetAll(int countPerPage = 20, int page = 1);

    UserResponse? GetById(int id);

    UserResponse Create(UserCreateRequest request);

    UserResponse? Update(int id, UserUpdateRequest request);

    UserResponse? Delete(int id);
}