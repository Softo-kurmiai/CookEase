using Application.DTOs;
using Application.DTOs.Comment;

namespace CookEase.Api.Interfaces;

public interface ICommentService
{
    Task<(CommentResponse? commentResponse, Error? error)> CreateComment(
        CommentCreateRequest request);

    Task<(List<CommentResponse>? comments, Error? error)> GetPaginatedCommentsByRecipeId(
        int recipeId, int commentsPerPage, int page);

    Task<decimal> GetRecipeRating(int recipeId);

    Task<Error?> UpdateLikeCount(
        int commentId,
        CommentLikeUpdateRequest request);
}