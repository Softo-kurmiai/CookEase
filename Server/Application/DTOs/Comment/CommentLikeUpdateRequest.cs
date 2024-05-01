using Application.Enums;

namespace Application.DTOs.Comment;

public class CommentLikeUpdateRequest
{
    public required CommentLikeAction Action { get; set; }
}