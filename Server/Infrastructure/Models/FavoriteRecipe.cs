using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace Infrastructure.Models;

[PrimaryKey(nameof(UserId), nameof(RecipeId))]
public class FavoriteRecipe
{
    [ForeignKey(nameof(User))]
    public int UserId { get; set; }

    [ForeignKey(nameof(Recipe))]
    public int RecipeId { get; set; }

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public DateTime CreatedAt { get; set; }
}