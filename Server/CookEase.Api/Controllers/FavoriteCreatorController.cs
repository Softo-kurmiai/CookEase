using Application.DTOs.FavoriteCreator;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace CookEase.Api.Controllers;

[ApiController]
[Route("api/favoriteCreators")]
public class FavoriteCreatorController : Controller
{
    public FavoriteCreatorController(){}

    [HttpPost("{userId}")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<FavoriteCreatorResponse>> AddCreatorToFavorite(
        [Required][FromRoute] int userId,
        [Required][FromQuery] int creatorId )
    {
        //TODO implement service

        return NotFound("Not implemented");
    }

    [HttpGet("{userId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<List<FavoriteCreatorResponse>>> GetPaginatedFavoriteCreatorsByUserId(
    [Required][FromRoute] int userId,
    [Required][FromQuery] int favoriteCreatorsPerPage = 10,
    [Required][FromQuery] int page = 1)
    {
        //TODO implement service

        return NotFound("Not implemented");
    }

    [HttpDelete("{userId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<FavoriteCreatorResponse>> RemoveFavoriteCreator(
        [Required][FromRoute] int userId,
        [Required][FromQuery] int creatorId)
    {
        //TODO implement service

        return NotFound("Not implemented");
    }
}
