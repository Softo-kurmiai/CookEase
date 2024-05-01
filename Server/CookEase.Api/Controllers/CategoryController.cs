using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Application.DTOs.Category;
using CookEase.Api.Interfaces;

namespace CookEase.Api.Controllers;

[ApiController]
[Route("api/categories")]
public class CategoryController : ControllerBase
{
    private readonly ICategoryService _categoryService;

    public CategoryController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpPut("replace")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<CategoryResponse>> ReplaceRecipeCategories(
        [Required][FromBody] CategoryRequest request)
    {
        var error = await _categoryService.ReplaceRecipeCategories(request);
        if (error is not null)
        {
            return BadRequest(error.ErrorMessage);
        }

        return Ok();
    }

    [HttpGet("recipe/{recipeId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<CategoryResponse>> GetCategoriesByRecipeId(
        [Required][FromRoute] int recipeId)
    {
        var (categories, error) = await _categoryService.GetCategoriesByRecipeId(recipeId);
        if (error is not null)
        {
            return NotFound(error.ErrorMessage);
        }

        return Ok(categories);
    }
}