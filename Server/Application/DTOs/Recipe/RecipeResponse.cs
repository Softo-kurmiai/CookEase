﻿using Application.DTOs.RecipeNutrition;
using Application.Enums;

namespace Application.DTOs.Recipe;

public class RecipeResponse
{
    public required int Id { get; set; }

    public required int CreatorId { get; set; }

    public required string Name { get; set; }

    public required string Description { get; set; }

    public required int PrepTime { get; set; }

    public required int CookTime { get; set; }

    public required Difficulty Difficulty { get; set; }

    public required decimal Rating { get; set; }

    public required List<Enums.Category> Categories { get; set; }

    public required RecipeNutritionResponse RecipeNutrition { get; set; }

    public required string Instructions { get; set; }

    public required int Servings { get; set; }

    public required string Ingredients { get; set; }

    public string? Image { get; set; }

    public int? ViewCount { get; set; }

    public int? CommentCount { get; set; }

    public int? FavoriteCount { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime? UpdatedDate { get; set; }
}