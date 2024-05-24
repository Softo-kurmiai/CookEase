using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using Application.Enums;

namespace Infrastructure.Models;

[PrimaryKey(nameof(Id))]
public class Recipe
{
    public int Id { get; set; }

    [ForeignKey(nameof(User))]
    public required int CreatorId { get; set; }

    public required string Name { get; set; }

    public required string Description { get; set; }

    public required int PrepTime { get; set; }

    public required int CookTime { get; set; }

    public required Difficulty Difficulty { get; set; }

    public required string Instructions { get; set; }

    public required int Servings { get; set; }

    public required string Ingredients { get; set; }

    public string? Image { get; set; }

    public int ViewCount { get; set; } = 0;

    public int CommentCount { get; set; } = 0;

    public int FavoriteCount { get; set; } = 0;

    public DateTime CreatedDate { get; set; }

    public DateTime? UpdatedDate { get; set; }
}