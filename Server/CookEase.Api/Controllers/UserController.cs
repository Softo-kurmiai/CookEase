
using Application.DTOs;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Application.Interfaces;

namespace CookEase.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase {

    IUserService _userService;

    public UserController(IUserService userService) {

        _userService = userService;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public ActionResult<List<UserDTO>> GetAll(int countPerPage = 20, int page = 1) {

        List<UserDTO> users = _userService.GetAll(countPerPage, page);

        return Ok(users);
    }

    [HttpGet("{userId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<UserDTO> Get(int userId) {

        UserDTO user = _userService.GetById(userId);
        if (user == null) {

            return NotFound("User not found");
        }

        return Ok(user);
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    public ActionResult<UserDTO> Post([Required] [FromBody] UserRequestDTO user) {

        var createdUser = _userService.Create(user);

        return Created("/api/User", createdUser);
    }

    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<UserDTO> Update([Required] int id, [Required] [FromBody] UserRequestDTO user) {

        var updatedUser = _userService.Update(id, user);
        if (updatedUser == null) {

            return NotFound("User not found");
        }

        return Ok(updatedUser);
    }

    [HttpDelete("id")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<UserDTO> Delete([Required] int id) {

        var user = _userService.Delete(id);
        if (user == null) {

            return NotFound("User not found");
        }

        return Ok(user);
    }
}
