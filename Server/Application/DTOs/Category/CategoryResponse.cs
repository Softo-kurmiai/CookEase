namespace Application.DTOs.Category;

public class CategoryResponse
{
    public required int RecipeId { get; set; }

    public required List<Enums.Category> Categories { get; set; }
}