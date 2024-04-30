using Application.DTOs.RecipeNutrition;
using Application.Enums;

namespace Application.DTOs.Recipe;

public class RecipeUpdateRequest
{
    public required int CreatorId { get; set; }

    public required string Name { get; set; }

    public required string Description { get; set; }

    public required int PrepTime { get; set; }

    public required int CookTime { get; set; }

    public required Difficulty Difficulty { get; set; }

    public required string Instructions { get; set; }

    public required int Servings { get; set; }

    public required string Ingredients { get; set; }

    public byte[]? Image { get; set; }

    public required RecipeNutritionUpdateRequest RecipeNutrition { get; set; }
}