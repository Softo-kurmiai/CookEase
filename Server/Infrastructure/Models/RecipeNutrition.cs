using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace Infrastructure.Models;

[PrimaryKey(nameof(Id))]
public class RecipeNutrition
{
    public int Id { get; set; }

    [ForeignKey(nameof(Recipe))]
    public required int RecipeId { get; set; }

    public required int Calories { get; set; }

    public required decimal Fat { get; set; }

    public required decimal Carbs { get; set; }

    public required decimal Fiber { get; set; }

    public required decimal Sugar { get; set; }

    public required decimal Protein { get; set; }
}