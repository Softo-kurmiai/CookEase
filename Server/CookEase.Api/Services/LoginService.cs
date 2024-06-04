using Application.DTOs.Login;
using Application.DTOs.User;
using AutoMapper;
using CookEase.Api.Interfaces;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.AspNetCore.Identity;

namespace CookEase.Api.Services;

public class LoginService : ILoginService
{

    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    private readonly IPasswordHasher<User> _passwordHasher;

    public LoginService(IUserRepository userRepository, IMapper mapper, IPasswordHasher<User> passwordHasher)
    {
        _userRepository = userRepository;
        _mapper = mapper;
        _passwordHasher = passwordHasher;
    }

    public async Task<LoginResponse> Authenticate(LoginRequest loginRequest)
    {
        var user = await _userRepository.GetUserByUsername(loginRequest.Username);
        if (user is null) 
        {
            throw new NullReferenceException();
        }

        if(_passwordHasher.VerifyHashedPassword(user, user.Password, loginRequest.Password) == PasswordVerificationResult.Failed) {
            throw new ArgumentException();
        }

        var mappedUser = _mapper.Map<UserResponse>(user);

        return new LoginResponse { User = mappedUser };
    }
}
