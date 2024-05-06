using Application.DTOs.User;
using AutoMapper;
using Infrastructure.Models;

namespace CookEase.Api.AutoMapper.Profiles;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, UserResponse>();
    }
}
