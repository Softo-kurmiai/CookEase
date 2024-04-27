using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace Infrastructure.Models;

[PrimaryKey(nameof(Id))]
public class Recipe
{
    public int Id { get; set; }

    [ForeignKey(nameof(User))]
    public int CreatorId { get; set; }

    public required string Name { get; set; }

    public required string Description { get; set; }

    public required string Contents { get; set; }

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public DateTime CreatedDate { get; set; }

    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public DateTime UpdatedDate { get; set; }

    public byte[]? Image { get; set; }
}