
namespace Application.DTOs.Collection;
public class CollectionCreateRequest
{
    public required int userId {  get; set; }

    public required string name { get; set; }

    public required string description { get; set; }
}
