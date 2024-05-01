using Application.DTOs.Category;
using AutoMapper;
using Infrastructure.Models;

namespace CookEase.Api.AutoMapper.Profiles;

public class CategoryProfile : Profile
{
    public CategoryProfile()
    {
        CreateMap<CategoryRequest, RecipeCategory>()
            .ForMember(dest => dest.RecipeId, src => src.MapFrom(x => x.RecipeId));
        CreateMap<RecipeCategory, CategoryResponse>()
            .ForMember(dest => dest.RecipeId, src => src.MapFrom(x => x.RecipeId));
    }
}