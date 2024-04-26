using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    [PrimaryKey(nameof(RecipeId), nameof(LabelID))]
    public class RecipeLabels
    {
        public long RecipeId { get; set; }
        public long LabelID { get; set; }
    }
}
