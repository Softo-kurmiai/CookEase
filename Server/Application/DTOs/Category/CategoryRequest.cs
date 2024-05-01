namespace Application.DTOs.Category;

public class CategoryRequest
{
    public required int RecipeId { get; set; }

    public required List<Enums.Category> Categories { get; set; }
}