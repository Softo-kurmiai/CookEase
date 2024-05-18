
namespace Application.DTOs.Collection;
public class CollectionCreateRequest
{
    public required int UserId {  get; set; }

    public required string Name { get; set; }

    public required string Description { get; set; }
}
