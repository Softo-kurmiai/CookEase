using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace Infrastructure.Models
{
    [PrimaryKey(nameof(Id))]
    public class CommentLike
    {
        public int Id { get; set; }

        [ForeignKey(nameof(Comment))]
        public required int CommentId { get; set; }

        [ForeignKey(nameof(User))]
        public required int UserId { get; set; }
    }
}
