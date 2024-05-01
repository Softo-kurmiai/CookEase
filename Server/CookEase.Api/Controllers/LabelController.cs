using Application.DTOs.Label;
using Application.DTOs.Recipe;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace CookEase.Api.Controllers;

[ApiController]
[Route("api/labels")]
public class LabelController : Controller
{
    LabelController() { }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<LabelResponse>> CreateLabel(
        [Required][FromBody] LabelCreateRequest labelRequest)
    {

        return NotFound("Not inplemented");
    }

    [HttpPost("recipe/{recipeId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<RecipeResponse>> AddLabelToRecipe(
        [Required][FromRoute] int recipeId,
        [Required][FromQuery] int labelId)
    {

        return NotFound("Not inplemented");
    }

    [HttpGet("{labelId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<LabelResponse>> GetLabelById(
        [Required][FromRoute] int labelId)
    {
        //TODO implement service

        return NotFound("Not implemented");
    }

    [HttpGet("recipe/{recipeId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<List<LabelResponse>>> GetLabelsByRecipeId(
        [Required][FromRoute] int recipeId)
    {
        //TODO implement service

        return NotFound("Not implemented");
    }

    [HttpGet("recipes/{labelId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<List<RecipeResponse>>> GetPaginatedRecipesByLabelId(
        [Required][FromRoute] int labelId,
        [Required][FromQuery] int recipesPerPage = 4,
        [Required][FromQuery] int page = 1)
    {
        //TODO implement service

        return NotFound("Not implemented");
    }

    [HttpPut("{labelId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<LabelResponse>> UpdateLabel(
        [Required][FromRoute] int labelId,
        [Required][FromBody] LabelUpdateRequest labelRequest)
    {
        //TODO implement service

        return NotFound("Not implemented");
    }

    [HttpDelete("recipe/{recipeId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<RecipeResponse>> RemoveLabelFromRecipe(
        [Required][FromRoute] int recipeId,
        [Required][FromQuery] int labelId)
    {
        //TODO implement service

        return NotFound("Not implemented");
    }

    [HttpDelete("{labelId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<RecipeResponse>> DeleteLabel(
        [Required][FromRoute] int labelId)
    {
        //TODO implement service

        return NotFound("Not implemented");
    }
}
