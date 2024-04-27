﻿using Microsoft.EntityFrameworkCore;
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

    public byte[]? Image { get; set; }

    public decimal? Rating { get; set; }

    public int? ViewCount { get; set; }

    public int? CommentCount { get; set; }

    public int? FavoriteCount { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime? UpdatedDate { get; set; }
}