using Application.DTOs.Recipe;
using Application.DTOs.RecipeNutrition;
using AutoMapper;
using Infrastructure.Models;

namespace CookEase.Api.AutoMapper.Profiles;

public class RecipeProfile : Profile
{
    public RecipeProfile()
    {
        CreateMap<RecipeCreateRequest, Recipe>();
        CreateMap<RecipeNutritionCreateRequest, RecipeNutrition>();
        CreateMap<Recipe, RecipeResponse>().ReverseMap();
        CreateMap<RecipeNutrition, RecipeNutritionResponse>().ReverseMap();
        CreateMap<List<Recipe>, List<RecipeResponse>>();
    }
}