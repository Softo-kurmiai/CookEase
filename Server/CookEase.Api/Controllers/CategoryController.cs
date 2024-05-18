using Microsoft.AspNetCore.Mvc;
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
}