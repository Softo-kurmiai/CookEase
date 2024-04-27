using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Models;

[PrimaryKey(nameof(Id))]
public class Label
{
    public int Id { get; set; }

    public required string Name { get; set; }

    public required string Description { get; set; }
}