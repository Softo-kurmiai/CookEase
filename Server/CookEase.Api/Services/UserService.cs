using Application.DTOs.User;
using CookEase.Api.Interfaces;

namespace CookEase.Api.Services;

public class UserService : IUserService
{
    public List<UserResponse> GetAll(int countPerPage = 20, int page = 1)
    {
        // TODO actually implement getting from repository
        var users = new List<UserResponse> { new()
        {
            Id = 69,
            Name = "Test",
            Email = "Test",
            Description = "Test",
            ProfilePicture = null,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
        }};

        return users;
    }

    public UserResponse? GetById(int id)
    {
        //TODO actually implement getting from repository
        if (id != 69)
        {
            return null;
        }

        var user = new UserResponse
        {
            Id = 69,
            Name = "Test",
            Email = "Test",
            Description = "Test",
            ProfilePicture = null,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
        };

        return user;
    }

    public UserResponse Create(UserCreateRequest userCreateRequest)
    {
        //TODO actually implement creating to repository
        var userToAdd = new UserResponse
        {
            Id = 69,
            Name = "Test",
            Email = "Test",
            Description = "Test",
            ProfilePicture = null,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
        };
        // var dbResponse = await _userRepository.Add(userToAdd);
        // return dbResponse;
        return userToAdd;
    }

    public UserResponse? Update(int id, UserUpdateRequest request)
    {
        //TODO actually implement updating to repository

        // firstly get the latest information of the user inside the DB
        // then try to change the gotten values from DB with values gotten from endpoint body (don't forget to check for nullability)
        // then call userRepository update method
        // return the DB response

        return null;
    }

    public UserResponse? Delete(int id)
    {
        //TODO actually implement deleting from repository
        if (id != 69)
        {
            return null;
            
        }

        var user = new UserResponse
        {
            Id = 69,
            Name = "Test",
            Email = "Test",
            Description = "Test",
            ProfilePicture = null,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
        };

        return user;
    }
}