using Application.DTOs.Recipe;
using Application.DTOs.User;
using AutoMapper;
using CookEase.Api.Interfaces;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Infrastructure.Repositories;

namespace CookEase.Api.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public UserService(IUserRepository userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }

    public async Task<List<UserResponse>> GetAll(int countPerPage = 20, int page = 1)
    {
        var offset = countPerPage * (page - 1);

        var users = await _userRepository.ListAsync(offset, countPerPage);

        var mappedUsers = _mapper.Map<List<UserResponse>>(users);

        return mappedUsers;
    }

    public async Task<UserResponse?> GetById(int id)
    {

        var user = await _userRepository.GetById(id);

        var mappedUser = _mapper.Map<UserResponse>(user);

        return mappedUser;
    }

    public async Task<UserResponse> Create(UserCreateRequest userCreateRequest)
    {
        var user = _mapper.Map<User>(userCreateRequest);

        user.CreatedAt = DateTime.UtcNow;
        user.UpdatedAt = null;

        var userDbResponse = await _userRepository.Add(user);

        var mappedUser = _mapper.Map<UserResponse>(userDbResponse);

        return mappedUser;
    }

    public async Task<UserResponse?> Update(int id, UserUpdateRequest request)
    {
        var user = await _userRepository.GetById(id);
        if (user is null)
        {
            return null;
        }

        user.Name = request.Name;
        user.Email = request.Email;
        user.Password = request.Password;
        user.Description = request.Description;
        user.ProfilePicture = request.ProfilePicture;
        user.UpdatedAt = DateTime.UtcNow;
        user.Version = request.Version;

        var userDBResponce = await _userRepository.Update(user);

        var mappedUser = _mapper.Map<UserResponse>(userDBResponce);

        return mappedUser;
    }

    public async Task<UserResponse?> Delete(int id)
    {
        var userDbResponce = await _userRepository.Delete(id);
        if (userDbResponce is null)
        {
            return null;
        }

        var mappedUser = _mapper.Map<UserResponse>(userDbResponce);

        return mappedUser;
    }
}