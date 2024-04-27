using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Models;

[PrimaryKey(nameof(RecipeId), nameof(LabelId))]
public class RecipeLabels
{
    public int RecipeId { get; set; }

    public int LabelId { get; set; }
}