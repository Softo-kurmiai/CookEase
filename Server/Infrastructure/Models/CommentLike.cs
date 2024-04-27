using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace Infrastructure.Models;

[PrimaryKey(nameof(CommentId), nameof(UserId))]
public class CommentLike
{
    [ForeignKey(nameof(User))]
    public int UserId { get; set; }

    [ForeignKey(nameof(Comment))]
    public int CommentId { get; set; }

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public DateTime CreatedAt { get; set; }
}