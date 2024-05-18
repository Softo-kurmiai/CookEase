using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Application.DTOs.Comment;
using CookEase.Api.Interfaces;

namespace CookEase.Api.Controllers;

[ApiController]
[Route("api/comments")]
public class CommentController : ControllerBase
{
    private readonly ICommentService _commentService;

    public CommentController(ICommentService commentService)
    {
        _commentService = commentService;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<CommentResponse>> CreateComment(
        [Required][FromBody] CommentCreateRequest commentRequest)
    {
        var (createdComment, error) = await _commentService.CreateComment(commentRequest);
        if (error is not null)
        {
            return BadRequest(error.ErrorMessage);
        }

        return Created("/api/comments", createdComment);
    }

    [HttpGet("recipe/{recipeId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<List<CommentResponse>>> GetPaginatedCommentsByRecipeId(
        [Required][FromRoute] int recipeId,
        [Required][FromQuery] int commentsPerPage = 4,
        [Required][FromQuery] int page = 1)
    {
        var (comments, error) =
            await _commentService.GetPaginatedCommentsByRecipeId(recipeId, commentsPerPage, page);
        if (error is not null)
        {
            return BadRequest(error.ErrorMessage);
        }

        return Ok(comments);
    }

    // The implementation of this endpoint should be changed to track who liked the comment
    [HttpPut("{id}/updateLikeCount")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<CommentResponse>> UpdateLikeCount(
        [Required][FromRoute] int id,
        [Required][FromBody] CommentLikeUpdateRequest request)
    {
        var error = await _commentService.UpdateLikeCount(id, request);
        if (error is not null)
        {
            return NotFound(error.ErrorMessage);
        }

        return Ok();
    }
}