using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace Infrastructure.Models;

[PrimaryKey(nameof(Id))]
public class Comment
{
    public int Id { get; set; }

    [ForeignKey(nameof(Recipe))]
    public required int RecipeId { get; set; }

    [ForeignKey(nameof(User))]
    public required int UserId { get; set; }

    [Range(0, 5)]
    public required decimal Rating { get; set; }

    [MaxLength(256)]
    public required string Content { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime? UpdatedDate { get; set; }
}