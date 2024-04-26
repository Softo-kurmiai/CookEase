using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks; 

namespace Infrastructure.Models
{
    [PrimaryKey(nameof(CollectionId), nameof(RecipeId))]
    public class CollectionRecipe
    {
        [ForeignKey(nameof(Collection))]
        public long CollectionId { get; set; }
        [ForeignKey(nameof(Recipe))]
        public long RecipeId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}