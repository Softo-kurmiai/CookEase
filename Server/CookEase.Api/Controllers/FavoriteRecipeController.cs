using Application.DTOs.FavoriteRecipe;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace CookEase.Api.Controllers;

[ApiController]
[Route("api/favoriteRecipes")]
[ApiExplorerSettings(IgnoreApi = true)]
public class FavoriteRecipeController : Controller
{
    public FavoriteRecipeController() { }

    [HttpPost("{userId}")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<FavoriteRecipeResponse>> AddRecipeToFavorite(
        [Required][FromRoute] int userId,
        [Required][FromQuery] int recipeId)
    {
        //TODO implement service

        return NotFound("Not implemented");
    }

    [HttpGet("{userId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<List<FavoriteRecipeResponse>>> GetPaginatedFavoriteRecepiesByUserId(
    [Required][FromRoute] int userId,
    [Required][FromQuery] int favoriteRecipesPerPage = 10,
    [Required][FromQuery] int page = 1)
    {
        //TODO implement service

        return NotFound("Not implemented");
    }

    [HttpDelete("{userId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<FavoriteRecipeResponse>> RemoveFavoriteRecipe(
        [Required][FromRoute] int userId,
        [Required][FromQuery] int recipeId)
    {
        //TODO implement service

        return NotFound("Not implemented");
    }
}
