﻿using CookEase.Api.AutoMapper;
using CookEase.Api.Interfaces;
using CookEase.Api.Services;
using Infrastructure.Interfaces;
using Infrastructure.Repositories;

namespace CookEase.Api.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        var mapper = MapperConfigurationSetup.Default.CreateMapper();
        services.AddSingleton(mapper);

        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IRecipeService, RecipeService>();

        return services;
    }

    public static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IRecipeRepository, RecipeRepository>();
        services.AddScoped<IRecipeNutritionRepository, RecipeNutritionRepository>();

        return services;
    }
}