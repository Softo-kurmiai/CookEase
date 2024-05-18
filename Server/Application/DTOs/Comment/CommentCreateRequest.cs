using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Comment;

public class CommentCreateRequest
{
    public required int RecipeId { get; set; }

    public required int UserId { get; set; }

    public required decimal Rating { get; set; }

    [MaxLength(256)]
    public required string Content { get; set; }
}