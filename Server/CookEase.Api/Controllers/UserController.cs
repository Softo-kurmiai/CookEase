using Application.Services;
using Application.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System;

namespace CookEase.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;
        IUserService _userService;

        public UserController(IUserService userService, ILogger<WeatherForecastController> logger)
        {
            _userService = userService;
            _logger = logger;
        }

        [HttpGet]
        public ActionResult<List<UserDTO>> GetAll()
        {
            List<UserDTO> users = _userService.GetAll();

            return users;
        }

        [HttpGet("{userId}")]
        public ActionResult<UserDTO> Get(int userId)
        {
            UserDTO user = _userService.GetById(userId);
            if (user == null)
                return NotFound("User not found");

            return user;
        }

        [HttpPost]
        public ActionResult<UserDTO> Post([Required] UserDTO user)
        {
            var createdUser = _userService.Create(user);
            return createdUser;
        }

        [HttpPut]
        public ActionResult<UserDTO> Update([Required] UserDTO user)
        {
            var updatedUser = _userService.Update(user);
            if (updatedUser == null)
                return NotFound("User not found");
            return updatedUser;
        }

        [HttpDelete("id")]
        public ActionResult<UserDTO> Delete([Required] int id)
        {
            var user = _userService.Delete(id);
            if (user == null)
                return NotFound("User not found");
            return user;
        }
    }
}
