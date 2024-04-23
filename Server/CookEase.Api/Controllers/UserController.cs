using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using CookEase.Api.Interfaces;
using Application.DTOs.User;

namespace CookEase.Api.Controllers;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<List<UserResponse>> GetAll(int countPerPage = 20, int page = 1)
    {
        var users = _userService.GetAll(countPerPage, page);
        return Ok(users);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<UserResponse> Get(int id) {

        var user = _userService.GetById(id);
        if (user is null)
        {
            return NotFound("User not found");
        }

        return Ok(user);
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public ActionResult<UserResponse> Post(
        [Required][FromBody] UserCreateRequest userRequest)
    {
        var createdUser = _userService.Create(userRequest);
        return Created("/api/User", createdUser);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<UserResponse> Update(
        [Required][FromRoute] int id,
        [Required][FromBody] UserUpdateRequest userRequest)
    {
        var updatedUser = _userService.Update(id, userRequest);
        if (updatedUser is null)
        {
            return NotFound("User not found");
        }

        return Ok(updatedUser);
    }

    [HttpDelete("{id}")]
    public ActionResult<UserResponse> Delete(
        [Required][FromRoute] int id)
    {
        var user = _userService.Delete(id);
        if (user is null)
        {
            return NotFound("User not found");
        }

        return Ok(user);
    }
}