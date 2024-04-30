namespace Application.DTOs.Comment;

public class CommentResponse
{
    public required int Id { get; set; }

    public required int RecipeId { get; set; }

    public required int UserId { get; set; }

    public required string Content { get; set; }

    public int? LikeCount { get; set; }

    public required DateTime CreatedDate { get; set; }

    public DateTime? UpdatedDate { get; set; }
}