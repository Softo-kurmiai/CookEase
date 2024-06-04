using Application.DTOs.Login;
using Application.DTOs.User;
using Application.DTOs.Token;
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
    private readonly ITokenService _tokenService;
    private readonly ITokenRepository _tokenRepository;

    public LoginService(IUserRepository userRepository, IMapper mapper, ITokenService tokenService, IPasswordHasher<User> passwordHasher)
    {
        _userRepository = userRepository;
        _mapper = mapper;
        _tokenService = tokenService;
        _passwordHasher = passwordHasher;
    }

    public async Task<LoginResponse> Authenticate(LoginRequest loginRequest)
    {
        if(loginRequest.Token != null)
        {
            return await AuthenticateToken(loginRequest);
        }

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

    private async Task<LoginResponse> AuthenticateToken(LoginRequest loginRequest)
    {
        var fullToken = await _tokenRepository.GetTokenByValue(loginRequest.Token);
        if (fullToken is null)
        {
            throw new NullReferenceException();
        }
        var user = await _userRepository.GetById(fullToken.UserId);
        if (user is null)
        {
            throw new NullReferenceException();
        }

        var mappedUser = _mapper.Map<UserResponse>(user);
        var mappedToken = _mapper.Map<TokenResponse>(fullToken);

        return new LoginResponse { User = mappedUser, Token = mappedToken };
       

    }
}
