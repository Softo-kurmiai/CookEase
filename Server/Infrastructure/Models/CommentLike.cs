using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    [PrimaryKey(nameof(CommentId), nameof(UserId))]
    public class CommentLike
    {
        [ForeignKey(nameof(User))]
        public long UserId { get; set; }
        [ForeignKey(nameof(Comment))]
        public long CommentId { get; set; }
        public DateTime CreatedAt { get; set; }
        public required Comment Comment { get; set; }
        public required User User { get; set; }
    }
}
