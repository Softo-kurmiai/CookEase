using Application.DTOs.RecipeNutrition;
using Application.Enums;

namespace Application.DTOs.Recipe;

public class RecipeUpdateRequest
{
    public int? CreatorId { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public int? PrepTime { get; set; }

    public int? CookTime { get; set; }

    public Difficulty? Difficulty { get; set; }

    public string? Instructions { get; set; }

    public int? Servings { get; set; }

    public string? Ingredients { get; set; }

    public byte[]? Image { get; set; }

    public decimal? Rating { get; set; }

    public int? ViewCount { get; set; }

    public int? CommentCount { get; set; }

    public int? FavoriteCount { get; set; }

    public RecipeNutritionUpdateRequest? RecipeNutrition { get; set; }
}