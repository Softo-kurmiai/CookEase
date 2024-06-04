using CookEase.Api.AutoMapper;
using CookEase.Api.Interfaces;
using CookEase.Api.Services;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Identity;

namespace CookEase.Api.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        var mapper = MapperConfigurationSetup.Default.CreateMapper();
        services.AddSingleton(mapper);

        services.AddScoped<IUserService, UserService>();
        services.AddScoped<ILoginService, LoginService>();
        //services.AddScoped<ILoginService, LoginWithTimeOutService>();
        services.AddScoped<IRecipeService, RecipeService>();
        services.AddScoped<ICommentService, CommentService>();
        services.AddScoped<ICategoryService, CategoryService>();

        services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();

        return services;
    }

    public static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IRecipeRepository, RecipeRepository>();
        services.AddScoped<IRecipeNutritionRepository, RecipeNutritionRepository>();
        services.AddScoped<ICommentRepository, CommentRepository>();
        services.AddScoped<IRecipeCategoryRepository, RecipeCategoryRepository>();
        services.AddScoped<ILogRepository, LogRepository>();
        services.AddScoped<ICommentLikeRepository, CommentLikeRepository>();

        return services;
    }
}