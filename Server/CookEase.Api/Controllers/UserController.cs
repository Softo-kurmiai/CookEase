
using Application.DTOs;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Application.Interfaces;

namespace CookEase.Api.Controllers {

    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase {

        IUserService _userService;

        public UserController(IUserService userService) {

            _userService = userService;
        }

        [HttpGet]
        public ActionResult<List<UserDTO>> GetAll(int? countPerPage, int? page) {

            List<UserDTO> users = _userService.GetAll(countPerPage, page);

            return Ok(users);
        }

        [HttpGet("{userId}")]
        public ActionResult<UserDTO> Get(int userId) {

            UserDTO user = _userService.GetById(userId);
            if (user == null) {

                return NotFound("User not found");
            }

            return Ok(user);
        }

        [HttpPost]
        public ActionResult<UserDTO> Post([Required] [FromBody] UserDTO user) {

            if(user.Id != null)
            {
                return BadRequest("Cannot POST a user with an ID. ID should be assigned by the server.");
            }

            var createdUser = _userService.Create(user);

            return Created("/api/User", createdUser);
        }

        [HttpPut]
        public ActionResult<UserDTO> Update([Required] [FromBody] UserDTO user) {

            var updatedUser = _userService.Update(user);
            if (updatedUser == null) {

                return NotFound("User not found");
            }

            return Ok(updatedUser);
        }

        [HttpDelete("id")]
        public ActionResult<UserDTO> Delete([Required] int id) {

            var user = _userService.Delete(id);
            if (user == null) {

                return NotFound("User not found");
            }

            return Ok(user);
        }
    }
}
