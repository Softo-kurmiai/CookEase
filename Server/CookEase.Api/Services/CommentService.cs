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
    private readonly ICommentLikeRepository _commentLikeRepository;
    private readonly IMapper _mapper;

    public CommentService(
        ICommentRepository commentRepository,
        ICommentLikeRepository commentLikeRepository,
        IMapper mapper)
    {
        _commentRepository = commentRepository;
        _commentLikeRepository = commentLikeRepository;
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

    public async Task<decimal> GetRecipeRating(int recipeId)
    {
        return await _commentRepository.GetRecipeRating(recipeId);
    }

    public (int? count, Error? error) GetRecipeCommentsCount(int recipeId)
    {
        int count;
        try
        {
            count = _commentRepository.GetCommentCountForRecipe(recipeId);
        }
        catch (Exception e)
        {
            return (null, new Error
            {
                ErrorMessage = "An error has occured:" + e.Message
            });
        }

        return (count, null);
    }

    public async Task UpdateLikeCount(
        int commentId,
        int userId,
        CommentLikeUpdateRequest request)
    {
        Task dbResponse = request.Action switch
        {
            CommentLikeAction.Increase => _commentLikeRepository.CreateCommentLike(commentId, userId),
            CommentLikeAction.Decrease => _commentLikeRepository.DeleteCommentLike(commentId, userId),
            _ => throw new ArgumentOutOfRangeException(
                $"The specified CommentLikeAction {request.Action} is not supported.")
        };

        await dbResponse;
    }

    public async Task<int> GetCommentLikes(int commentId)
    {
        var result = await _commentLikeRepository.GetCommentLikes(commentId);
        return result;
    }
}