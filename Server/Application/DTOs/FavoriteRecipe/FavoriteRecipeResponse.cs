
namespace Application.DTOs.FavoriteRecipe;
public class FavoriteRecipeResponse
{
    public int UserId { get; set; }

    public int RecipeId { get; set; }

    public DateTime CreatedAt { get; set; }
}
