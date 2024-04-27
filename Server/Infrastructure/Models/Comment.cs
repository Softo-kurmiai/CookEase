using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace Infrastructure.Models;

[PrimaryKey(nameof(Id))]
public class Comment
{
    public int Id { get; set; }

    [ForeignKey(nameof(Recipe))]
    public int RecipeId { get; set; }

    [ForeignKey(nameof(User))]
    public int UserId { get; set; }

    public required string Content { get; set; }

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public DateTime CreatedAt { get; set; }

    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public DateTime UpdatedAt { get; set; }
}