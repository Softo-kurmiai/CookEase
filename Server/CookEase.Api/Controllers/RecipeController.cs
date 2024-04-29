using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Application.DTOs.Recipe;
using CookEase.Api.Interfaces;

namespace CookEase.Api.Controllers;

[ApiController]
[Route("api/recipes")]
public class RecipeController : ControllerBase
{
    private readonly IRecipeService _recipeService;

    public RecipeController(IRecipeService recipeService)
    {
        _recipeService = recipeService;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<RecipeResponse>> CreateRecipe(
        [Required][FromBody] RecipeCreateRequest recipeRequest)
    {
        var (createdRecipe, error) = await _recipeService.CreateRecipe(recipeRequest);
        if (error is not null)
        {
            return BadRequest(error.ErrorMessage);
        }

        return Created("/api/recipes", createdRecipe);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<RecipeResponse>> GetRecipeById(
        [Required][FromRoute] int id)
    {
        var (recipe, error) = await _recipeService.GetRecipeById(id);
        if (error is not null)
        {
            return NotFound(error.ErrorMessage);
        }

        return Ok(recipe);
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<List<RecipeResponse>>> GetPaginatedRecipes(
        [Required][FromQuery] int recipesPerPage = 5,
        [Required][FromQuery] int page = 1)
    {
        var (recipes, error) =
            await _recipeService.GetPaginatedRecipes(recipesPerPage, page);
        if (error is not null)
        {
            return NotFound(error.ErrorMessage);
        }

        return Ok(recipes);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<RecipeResponse>> DeleteRecipe(
        [Required][FromRoute] int id)
    {
        var (deletedRecipe, error) = await _recipeService.DeleteRecipe(id);
        if (error is not null)
        {
            return NotFound(error.ErrorMessage);
        }

        return Ok(deletedRecipe);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<RecipeResponse>> UpdateRecipe(
        [Required][FromRoute] int id,
        [Required][FromBody] RecipeUpdateRequest request)
    {
        var (updatedRecipe, error) = await _recipeService.UpdateRecipe(id, request);
        if (error is not null)
        {
            return NotFound(error.ErrorMessage);
        }

        return Ok(updatedRecipe);
    }

    [HttpGet("creator/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<List<RecipeResponse>>> GetRecipesByCreatorId(
        [Required][FromRoute] int id)
    {
        var (recipes, error) = await _recipeService.GetRecipesByCreatorId(id);
        if (error is not null)
        {
            return NotFound(error.ErrorMessage);
        }

        return Ok(recipes);
    }

    [HttpPut("{id}/updateMetric")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> IncreaseRecipeMetric(
        [Required][FromRoute] int id,
        [Required][FromBody] RecipeMetricsUpdateRequest updateRequest)
    {
        var error = await _recipeService.IncreaseRecipeMetric(id, updateRequest);
        if (error is not null)
        {
            return NotFound(error.ErrorMessage);
        }

        return Ok();
    }

    [HttpGet("{recipeId}/user/{userId}/rating")]
    public async Task<ActionResult<decimal>> GetUserRecipeRating(
        [Required][FromRoute] int recipeId,
        [Required][FromRoute] int userId)
    {
        var rating = await _recipeService.GetUserRecipeRating(userId, recipeId);
        return Ok(rating);
    }

    [HttpGet("{id}/rating")]
    public async Task<ActionResult<decimal>> GetRecipeRating(
        [Required][FromRoute] int id)
    {
        var rating = await _recipeService.GetRecipeRating(id);
        return Ok(rating);
    }

    [HttpPut("{recipeId}/updateRating")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult> AddRecipeRating(
        [Required][FromRoute] int recipeId,
        [Required][FromQuery] int userId,
        [Required][FromQuery] decimal newRatingValue)
    {
        await _recipeService.UpdateUserRecipeRating(userId, recipeId, newRatingValue);
        return Ok();
    }
}