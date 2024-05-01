using AutoMapper;
using CookEase.Api.AutoMapper.Profiles;

namespace CookEase.Api.AutoMapper;

public static class MapperConfigurationSetup
{
    public static MapperConfiguration Default =>
        new(mapper =>
        {
            mapper.AddProfile(new RecipeProfile());
            mapper.AddProfile(new CommentProfile());
        });
}