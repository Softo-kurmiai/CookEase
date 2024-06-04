using Application.DTOs.Token;
using AutoMapper;
using Infrastructure.Models;


namespace CookEase.Api.AutoMapper.Profiles;

public class TokenProfile : Profile
{
    public TokenProfile() 
    {
        CreateMap<Token, TokenResponse>();
    }
}
