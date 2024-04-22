using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    [PrimaryKey(nameof(Id))]
    public class Label
    {
        public long Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public string? ImageLocation { get; set; }
        public ICollection<Recipe> Recipes { get; } = new List<Recipe>();
    }
}
