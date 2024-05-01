using Application.Enums;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Models;

[PrimaryKey(nameof(RecipeId), nameof(Category))]
public class RecipeCategory
{
    public int RecipeId { get; set; }

    public Category Category { get; set; }
}