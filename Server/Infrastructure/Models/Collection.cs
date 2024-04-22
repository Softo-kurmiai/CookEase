using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    [PrimaryKey(nameof(Id))]
    public class Collection
    {
        public long Id { get; set; }
        [ForeignKey(nameof(User))]
        public long UserId { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastUpdatedAt { get; set; }
        public required User User { get; set; }
        public ICollection<Recipe> Recipes { get; } = new List<Recipe>();
        public ICollection<CollectionRecipe> CollectionRecipes { get; } = new List<CollectionRecipe>();
    }
}
