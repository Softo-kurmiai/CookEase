using Application.DTOs.Collection;
using Infrastructure.Models;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace CookEase.Api.Controllers;

[ApiController]
[Route("api/collections")]
public class CollectionController : Controller
{
    CollectionController() { }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<CollectionResponse>> CreateCollection(
        [Required][FromBody] CollectionCreateRequest collectionRequest)
    {
        //TODO implement service

        return NotFound("Not implemented");
    }

    [HttpGet("user/{userId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<List<CollectionResponse>>> GetPaginatedCollectionsByUserId(
        [Required][FromRoute] int userId,
        [Required][FromQuery] int collectionsPerPage = 4,
        [Required][FromQuery] int page = 1)
    {
        //TODO implement service

        return NotFound("Not implemented");
    }

    [HttpGet("{collectionId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<CollectionResponse>> GetCollectionById(
        [Required][FromRoute] int collectionId)
    {
        //TODO implement service

        return NotFound("Not implemented");
    }

    [HttpPut("{collectionId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<CollectionResponse>> UpdateCollcetion(
        [Required][FromRoute] int collectionId,
        [Required][FromBody] CollectionUpdateRequest collectionUpdateRequest)
    {
        //TODO implement service

        return NotFound("Not implemented");
    }

    [HttpPut("{collectionId}/addRecipe")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<CollectionResponse>> AddRecipeToCollcetion(
        [Required][FromRoute] int collectionId,
        [Required][FromQuery] int recipeId)
    {
        //TODO implement service

        return NotFound("Not implemented");
    }

    [HttpDelete("{collectionId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<CollectionResponse>> DeleteCollcetion(
        [Required][FromRoute] int collectionId)
    {
        //TODO implement service

        return NotFound("Not implemented");
    }
}
