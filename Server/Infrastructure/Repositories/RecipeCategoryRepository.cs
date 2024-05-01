﻿using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class RecipeCategoryRepository : GenericRepository<RecipeCategory>, IRecipeCategoryRepository
{
    private readonly DbSet<RecipeCategory> _recipeCategories;
    private readonly AppDbContext _context;

    public RecipeCategoryRepository(AppDbContext context) : base(context)
    {
        _recipeCategories = context.Set<RecipeCategory>();
        _context = context;
    }

    public async Task ReplaceRecipeCategories(int recipeId, List<RecipeCategory> newCategories)
    {
        var previousCategories = await _recipeCategories
            .Where(x => x.RecipeId == recipeId)
            .ToListAsync();
        if (previousCategories.Any())
        {
            _recipeCategories.RemoveRange(previousCategories);
            await _context.SaveChangesAsync();
        }

        await _recipeCategories.AddRangeAsync(newCategories);
        await _context.SaveChangesAsync();
    }

    public async Task<List<RecipeCategory>?> GetCategoriesByRecipeId(int recipeId)
    {
        return await _recipeCategories
            .Where(x => x.RecipeId == recipeId)
            .ToListAsync();
    }
}