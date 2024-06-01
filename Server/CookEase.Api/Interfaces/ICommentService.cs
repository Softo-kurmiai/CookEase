using Application.DTOs;
using Application.DTOs.Comment;

namespace CookEase.Api.Interfaces;

public interface ICommentService
{
    Task<(CommentResponse? commentResponse, Error? error)> CreateComment(
        CommentCreateRequest request);

    Task<(List<CommentResponse>? comments, Error? error)> GetPaginatedCommentsByRecipeId(
        int recipeId, int commentsPerPage, int page);

    (int? count, Error? error) GetRecipeCommentsCount(int recipeId);

    Task<decimal> GetRecipeRating(int recipeId);

    Task UpdateLikeCount(
        int commentId,
        int userId,
        CommentLikeUpdateRequest request);

    Task<int> GetCommentLikes(int commentId);
}