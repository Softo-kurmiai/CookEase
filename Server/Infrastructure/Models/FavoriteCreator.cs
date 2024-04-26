using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    [PrimaryKey(nameof(UserId), nameof(CreatorId))]
    public class FavoriteCreator
    {
        [ForeignKey(nameof(User))]
        public long UserId { get; set; }
        [ForeignKey(nameof(User))]
        public long CreatorId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
