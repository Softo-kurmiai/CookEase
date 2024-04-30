using Application.DTOs;
using Application.DTOs.Comment;

namespace CookEase.Api.Interfaces;

public interface ICommentService
{
    Task<(CommentResponse? commentResponse, Error? error)> CreateComment(
        CommentCreateRequest request);

    Task<(List<CommentResponse>? comments, Error? error)> GetPaginatedCommentsByRecipeId(
        int recipeId, int commentsPerPage, int page);

    int GetRecipeCommentsCount(int recipeId);

    Task<(CommentResponse? commentResponse, Error? error)> DeleteComment(
        int commentId);

    Task<(CommentResponse? commentResponse, Error? error)> UpdateComment(
        int commentId,
        CommentUpdateRequest request);

    Task<Error?> UpdateLikeCount(
        int commentId,
        CommentLikeUpdateRequest request);
}