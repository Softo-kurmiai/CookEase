namespace Application.DTOs.RecipeNutrition;

public class RecipeNutritionUpdateRequest
{
    public int? Calories { get; set; }

    public decimal? Fat { get; set; }

    public decimal? Carbs { get; set; }

    public decimal? Fiber { get; set; }

    public decimal? Sugar { get; set; }

    public decimal? Protein { get; set; }
}