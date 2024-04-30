using Application.DTOs;
using Application.DTOs.Comment;
using Application.Enums;
using AutoMapper;
using CookEase.Api.Interfaces;
using Infrastructure.Interfaces;
using Infrastructure.Models;

namespace CookEase.Api.Services;

public class CommentService : ICommentService
{
    private readonly ICommentRepository _commentRepository;
    private readonly IMapper _mapper;

    public CommentService(
        ICommentRepository commentRepository,
        IMapper mapper)
    {
        _commentRepository = commentRepository;
        _mapper = mapper;
    }

    public async Task<(CommentResponse? commentResponse, Error? error)> CreateComment(
        CommentCreateRequest request)
    {
        var mappedCommentRequest = _mapper.Map<Comment>(request);
        if (mappedCommentRequest is null)
        {
            return (null,
                new Error
                {
                    ErrorMessage = "Mapping failed (null) when creating a comment."
                });
        }

        mappedCommentRequest.CreatedDate = DateTime.UtcNow;
        var commentDbResponse = await _commentRepository.Add(mappedCommentRequest);
        var mappedCommentResponse = _mapper.Map<CommentResponse>(commentDbResponse);
        if (mappedCommentResponse is null)
        {
            return (null,
                new Error
                {
                    ErrorMessage = "Mapping failed (null) from Comment DB response."
                });
        }

        return (mappedCommentResponse, null);
    }

    public async Task<(List<CommentResponse>? comments, Error? error)> GetPaginatedCommentsByRecipeId(
        int recipeId, int commentsPerPage, int page)
    {
        var comments =
            await _commentRepository.GetCommentsByRecipeId(recipeId, commentsPerPage, page);
        if (comments is null)
        {
            return ([], null);
        }

        var mappedComments = _mapper.Map<List<CommentResponse>>(comments);
        if (mappedComments is null)
        {
            return (null,
                new Error
                {
                    ErrorMessage = "Mapping failed for list of comments."
                });
        }

        return (mappedComments, null);
    }

    public int GetRecipeCommentsCount(int recipeId)
    {
        return _commentRepository.GetCommentCountForRecipe(recipeId);
    }

    public async Task<(CommentResponse? commentResponse, Error? error)> DeleteComment(
        int commentId)
    {
        var deletedComment = await _commentRepository.Delete(commentId);
        var mappedComment = _mapper.Map<CommentResponse>(deletedComment);
        if (mappedComment is null)
        {
            return (null,
                new Error
                {
                    ErrorMessage = $"Mapping of comment failed. The comment with " +
                                   $"id {commentId} was not found when trying to delete."
                });
        }

        return (mappedComment, null);
    }

    public async Task<(CommentResponse? commentResponse, Error? error)> UpdateComment(
        int commentId,
        CommentUpdateRequest request)
    {
        var commentToUpdate = await _commentRepository.GetById(commentId);
        if (commentToUpdate is null)
        {
            return (null,
                new Error
                {
                    ErrorMessage = $"Comment with id {commentId} was not found."
                });
        }

        await _commentRepository.Detach(commentToUpdate);
        commentToUpdate.Content = request.Content;
        commentToUpdate.UpdatedDate = DateTime.UtcNow;

        var dbResponse = await _commentRepository.Update(commentToUpdate);
        var mappedDbResponse = _mapper.Map<CommentResponse>(dbResponse);
        if (mappedDbResponse is null)
        {
            return (null,
                new Error
                {
                    ErrorMessage = "Mapping of comment update failed."
                });
        }

        return (mappedDbResponse, null);
    }

    public async Task<Error?> UpdateLikeCount(
        int commentId,
        CommentLikeUpdateRequest request)
    {
        var dbResponse = request.Action switch
        {
            CommentLikeAction.Increase => await _commentRepository.IncreaseCommentLikeCount(commentId),
            CommentLikeAction.Decrease => await _commentRepository.DecreaseCommentLikeCount(commentId),
            _ => throw new ArgumentOutOfRangeException(
                $"The specified CommentLikeAction {request.Action} is not supported.")
        };
        if (dbResponse is null)
        {
            return new Error { ErrorMessage = $"Comment with id {commentId} was not found" };
        }

        return null;
    }
}