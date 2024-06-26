﻿using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Application.DTOs.Recipe;
using Application.Enums;
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

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<List<RecipeCardResponse>>> GetPaginatedRecipeCards(
        [Required] [FromQuery] int recipesPerPage = 5,
        [Required] [FromQuery] int page = 1)
    {
        var (recipes, error) =
            await _recipeService.GetPaginatedRecipeCards(recipesPerPage, page);
        if (error is not null)
        {
            return NotFound(error.ErrorMessage);
        }

        return Ok(recipes);
    }

    [HttpGet("topLiked")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<List<RecipeCardResponse>>> GetTopLikedRecipeCards(
        [Required] [FromQuery] int maxNumberOfRecipes)
    {
        var recipes = await _recipeService.GetNumberOfTopLikedRecipeCards(maxNumberOfRecipes);
        return Ok(recipes);
    }

    [HttpGet("random")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<List<RecipeCardResponse>>> GetRandomRecipeCards(
        [Required] [FromQuery] int maxNumberOfRecipes)
    {
        var recipes = await _recipeService.GetNumberOfRandomRecipeCards(maxNumberOfRecipes);
        return Ok(recipes);
    }

    [HttpGet("{id}/full")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<RecipeResponse>> GetRecipeById(
        [Required] [FromRoute] int id)
    {
        var (recipe, error) = await _recipeService.GetRecipeById(id);
        if (error is not null)
        {
            return NotFound(error.ErrorMessage);
        }

        return Ok(recipe);
    }

    [HttpGet("creator/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<List<RecipeCardResponse>>> GetRecipeCardsByCreatorId(
        [Required] [FromRoute] int id,
        [Required] [FromQuery] int recipesPerPage = 5,
        [Required] [FromQuery] int page = 1)
    {
        var (recipes, error) =
            await _recipeService.GetRecipeCardsByCreatorId(id, recipesPerPage, page);
        if (error is not null)
        {
            return NotFound(error.ErrorMessage);
        }

        return Ok(recipes);
    }

    [HttpGet("category/{categoryName}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<List<RecipeCardResponse>>> GetRecipeCardsByCategoryName(
        [Required] [FromRoute] Category categoryName,
        [Required] [FromQuery] int recipesPerPage = 5,
        [Required] [FromQuery] int page = 1)
    {
        var (recipes, error) =
            await _recipeService.GetRecipeCardsByCategoryName(categoryName, recipesPerPage, page);
        if (error is not null)
        {
            return NotFound(error.ErrorMessage);
        }

        return Ok(recipes);
    }

    [HttpGet("search")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<List<RecipeCardResponse>>> SearchRecipeCardsByName(
        [Required] [FromQuery] string searchTerm,
        [Required] [FromQuery] int recipesPerPage = 5,
        [Required] [FromQuery] int page = 1)
    {
        var (recipes, error) =
            await _recipeService.SearchRecipeCardsByName(searchTerm, recipesPerPage, page);
        if (error is not null)
        {
            return NotFound(error.ErrorMessage);
        }

        return Ok(recipes);
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<RecipeResponse>> CreateRecipe(
        [Required] [FromBody] RecipeCreateRequest recipeRequest)
    {
        var (createdRecipe, error) = await _recipeService.CreateRecipe(recipeRequest);
        if (error is not null)
        {
            return BadRequest(error.ErrorMessage);
        }

        return Created("/api/recipes", createdRecipe);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<RecipeResponse>> UpdateRecipe(
        [Required] [FromRoute] int id,
        [Required] [FromBody] RecipeUpdateRequest request)
    {
        var (updatedRecipe, error) = await _recipeService.UpdateRecipe(id, request);
        if (error is not null)
        {
            return NotFound(error.ErrorMessage);
        }

        return Ok(updatedRecipe);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<RecipeResponse>> DeleteRecipe(
        [Required] [FromRoute] int id)
    {
        var (deletedRecipe, error) = await _recipeService.DeleteRecipe(id);
        if (error is not null)
        {
            return NotFound(error.ErrorMessage);
        }

        return Ok(deletedRecipe);
    }

    [HttpGet("count")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public ActionResult<int> GetTotalRecipeCount()
    {
        return Ok(_recipeService.GetTotalNumberOfRecipes());
    }

    [HttpGet("creator/{id}/count")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public ActionResult<int> GetTotalCreatorRecipeCount(
        [Required] [FromRoute] int id)
    {
        return Ok(_recipeService.GetTotalNumberOfCreatorRecipes(id));
    }

    //[HttpPut("{id}/updateMetric")]
    //[ProducesResponseType(StatusCodes.Status200OK)]
    //[ProducesResponseType(StatusCodes.Status404NotFound)]
    //public async Task<ActionResult> IncreaseRecipeMetric(
    //    [Required][FromRoute] int id,
    //    [Required][FromBody] RecipeMetricsUpdateRequest updateRequest)
    //{
    //    var error = await _recipeService.IncreaseRecipeMetric(id, updateRequest);
    //    if (error is not null)
    //    {
    //        return NotFound(error.ErrorMessage);
    //    }

    //    return Ok();
    //}

    // Implementation should be changed
    //[HttpPut("{recipeId}/updateRating")]
    //[ProducesResponseType(StatusCodes.Status200OK)]
    //public async Task<ActionResult> AddRecipeRating(
    //    [Required][FromRoute] int recipeId,
    //    [Required][FromQuery] int userId,
    //    [Required][FromQuery] decimal newRatingValue)
    //{
    //    await _recipeService.UpdateUserRecipeRating(userId, recipeId, newRatingValue);
    //    return Ok();
    //}
}