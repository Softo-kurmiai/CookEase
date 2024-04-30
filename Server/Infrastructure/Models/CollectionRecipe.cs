using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace Infrastructure.Models;

[PrimaryKey(nameof(CollectionId), nameof(RecipeId))]
public class CollectionRecipe
{
    [ForeignKey(nameof(Collection))]
    public int CollectionId { get; set; }

    [ForeignKey(nameof(Recipe))]
    public int RecipeId { get; set; }

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public DateTime CreatedAt { get; set; }
}