using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Application.DTOs.Category;
using Application.Enums;
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

    [HttpGet("getAll")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public ActionResult<List<Category>> GetAllEnumCategories()
    {
        var categories = _categoryService.GetAllCategories();
        return Ok(categories);
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
}