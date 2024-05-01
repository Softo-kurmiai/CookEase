namespace Application.DTOs.RecipeNutrition;

public class RecipeNutritionResponse
{
    public int Id { get; set; }

    public required int RecipeId { get; set; }

    public required int Calories { get; set; }

    public required decimal Fat { get; set; }

    public required decimal Carbs { get; set; }

    public required decimal Fiber { get; set; }

    public required decimal Sugar { get; set; }

    public required decimal Protein { get; set; }
}