using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using CookEase.Api.Interfaces;
using Application.DTOs.User;
using AutoMapper;
using System.Data;
using Microsoft.EntityFrameworkCore;

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
    public async Task<ActionResult<List<UserResponse>>> GetAll(int countPerPage = 20, int page = 1)
    {
        var users = await _userService.GetAll(countPerPage, page);
        return Ok(users);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<UserResponse>> Get(int id) {

        var user = await _userService.GetById(id);
        if (user is null)
        {
            return NotFound("User not found");
        }

        return Ok(user);
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<UserResponse>> Post(
        [Required][FromBody] UserCreateRequest userRequest)
    {
        var createdUser = await _userService.Create(userRequest);
        return Created("/api/User", createdUser);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<UserResponse>> Update(
        [Required][FromBody] UserUpdateRequest userRequest,
        [Required][FromRoute] int id = 1)
    {
        try
        {
            var updatedUser = await _userService.Update(id, userRequest);
            if (updatedUser is null)
            {
                return NotFound("User not found");
            }

            return Ok(updatedUser);
        }
        catch(DbUpdateConcurrencyException ex)
        {
            if (ex.Data.Contains("ConflictData"))
            {
                var conflictData = ex.Data["ConflictData"];
                return Conflict(conflictData);
            }

            return Conflict(new
            {
                Message = "A concurrency conflict occurred."
            });
        }
        
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<UserResponse>> Delete(
        [Required][FromRoute] int id)
    {
        var user = await _userService.Delete(id);
        if (user is null)
        {
            return NotFound("User not found");
        }

        return Ok(user);
    }
}