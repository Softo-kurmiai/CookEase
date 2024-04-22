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
    public class Comment
    {
        public long Id { get; set; }
        [ForeignKey(nameof(Recipe))]
        public long RecipeId { get; set; }
        [ForeignKey(nameof(User))]
        public long UserId { get; set; }
        public required string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public required Recipe Recipe { get; set; }
        public required User User { get; set; }
        public ICollection<CommentLike>? CommentLikes { get; }
    }
}
