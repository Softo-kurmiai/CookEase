﻿using Application.DTOs.Login;
using CookEase.Api.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace CookEase.Api.Controllers;

[ApiController]
[Route("api/login")]
public class LoginController : ControllerBase
{

    private readonly ILoginService _loginService;

    public LoginController(ILoginService loginService)
    {
        _loginService = loginService;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<LoginResponse>> Post(
    [Required][FromBody] LoginRequest loginRequest)
    {
        try
        {
            var loginResponse = await _loginService.Authenticate(loginRequest);

            return Ok(loginResponse);
        } 
        catch (NullReferenceException) 
        {
            return NotFound();
        }
        catch (ArgumentException)
        {
            return Unauthorized();
        }
        catch (InvalidOperationException)
        {
            return Unauthorized("Too many login attempts");
        }
    }
}
