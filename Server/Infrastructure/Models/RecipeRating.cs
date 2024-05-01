using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Models;

[PrimaryKey(nameof(RecipeId), nameof(UserId))]
public class RecipeRating
{
    public required int RecipeId { get; set; }

    public required int UserId { get; set; }

    [Range(0, 5)]
    public required decimal Rating { get; set; } = 0;
}