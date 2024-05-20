using Application.DTOs.Login;
using Application.DTOs.User;
using AutoMapper;
using CookEase.Api.Interfaces;
using Infrastructure.Interfaces;

namespace CookEase.Api.Services;

public class LoginService : ILoginService
{

    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public LoginService(IUserRepository userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }

    public async Task<LoginResponse> Authenticate(LoginRequest loginRequest)
    {
        var user = await _userRepository.GetUserByUsername(loginRequest.Username);
        if (user is null) 
        {
            throw new NullReferenceException();
        }

        if(user.Password != loginRequest.Password)
        {
            throw new ArgumentException();
        }

        var mappedUser = _mapper.Map<UserResponse>(user);

        return new LoginResponse { User = mappedUser };
    }
}
