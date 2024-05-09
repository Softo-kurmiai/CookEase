
namespace Application.DTOs.Collection;
public class CollectionResponse
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public required string Name { get; set; }

    public required string Description { get; set; }

    public required List<int> RecipeIds { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime LastUpdatedAt { get; set; }
}
