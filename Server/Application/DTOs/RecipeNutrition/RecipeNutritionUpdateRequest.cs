namespace Application.DTOs.RecipeNutrition;

public class RecipeNutritionUpdateRequest
{
    public required int Calories { get; set; }

    public required decimal Fat { get; set; }

    public required decimal Carbs { get; set; }

    public required decimal Fiber { get; set; }

    public required decimal Sugar { get; set; }

    public required decimal Protein { get; set; }
}