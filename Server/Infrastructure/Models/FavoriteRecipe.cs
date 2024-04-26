using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    [PrimaryKey(nameof(UserId), nameof(RecipeId))]
    public class FavoriteRecipe
    {
        [ForeignKey(nameof(User))]
        public long UserId { get; set; }
        [ForeignKey(nameof(Recipe))]
        public long RecipeId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
