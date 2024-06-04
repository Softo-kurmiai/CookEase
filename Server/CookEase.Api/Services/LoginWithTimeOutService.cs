using Application.DTOs.Login;
using Application.DTOs.User;
using Application.Helpers;
using AutoMapper;
using CookEase.Api.Interfaces;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.AspNetCore.Identity;

namespace CookEase.Api.Services;

public class LoginWithTimeOutService : ILoginService
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    private readonly IPasswordHasher<User> _passwordHasher;

    private static Dictionary<string, FailedLoginAttempt> _failedLoginAttempts = new Dictionary<string, FailedLoginAttempt>();
    private static readonly object _lock = new object();
    private static readonly TimeSpan LockoutTimeSpan = TimeSpan.FromMinutes(5);
    private const int MaxFailedAttempts = 10;

    private static Timer _cleanupTimer = new Timer(CleanupOldAttempts, null, TimeSpan.FromMinutes(1), TimeSpan.FromMinutes(1));

    public LoginWithTimeOutService(IUserRepository userRepository, IMapper mapper, IPasswordHasher<User> passwordHasher)
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

        lock (_lock)
        {
            // Check if the user is locked out
            if (_failedLoginAttempts.TryGetValue(loginRequest.Username, out var failedAttempt) &&
                failedAttempt.AttemptCount >= MaxFailedAttempts &&
                DateTime.Now - failedAttempt.FirstAttemptTime < LockoutTimeSpan)
            {
                throw new InvalidOperationException("User account locked due to too many failed login attempts.");
            }
        }

        if (_passwordHasher.VerifyHashedPassword(user, user.Password, loginRequest.Password) == PasswordVerificationResult.Failed)
        {
            lock (_lock)
            {
                if (!_failedLoginAttempts.ContainsKey(loginRequest.Username))
                {
                    _failedLoginAttempts[loginRequest.Username] = new FailedLoginAttempt
                    {
                        FirstAttemptTime = DateTime.Now,
                        AttemptCount = 1
                    };
                }
                else
                {
                    var failedAttempt = _failedLoginAttempts[loginRequest.Username];
                    if (DateTime.Now - failedAttempt.FirstAttemptTime > LockoutTimeSpan)
                    {
                        // Reset the count if the last failed attempt is older than the lockout period
                        failedAttempt.FirstAttemptTime = DateTime.Now;
                        failedAttempt.AttemptCount = 1;
                    }
                    else
                    {
                        failedAttempt.AttemptCount++;
                    }
                }
            }

            throw new ArgumentException("Invalid username or password.");
        }

        lock (_lock)
        {
            // Successful login, remove any existing failed attempts
            if (_failedLoginAttempts.ContainsKey(loginRequest.Username))
            {
                _failedLoginAttempts.Remove(loginRequest.Username);
            }
        }

        var mappedUser = _mapper.Map<UserResponse>(user);
        return new LoginResponse { User = mappedUser };
    }

    private static void CleanupOldAttempts(object? state)
    {
        lock (_lock)
        {
            var now = DateTime.Now;
            var keysToRemove = _failedLoginAttempts
                .Where(kvp => now - kvp.Value.FirstAttemptTime > LockoutTimeSpan)
                .Select(kvp => kvp.Key)
                .ToList();

            foreach (var key in keysToRemove)
            {
                _failedLoginAttempts.Remove(key);
            }
        }
    }
}
