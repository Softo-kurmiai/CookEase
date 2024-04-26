using Infrastructure.Repositories;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Infrastructure.Models;

namespace CookEase.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        // This is an example of how to use Repositories in Services and/or Controllers
        // Delete if unnecessary. 
        private UserRepository userRepository;
        public WeatherForecastController(AppDbContext appDbContext)
        {
            this.userRepository = new UserRepository(appDbContext);
        }

        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet(Name = "GetWeatherForecast")]
        public async Task<ActionResult<User>> Get()
        {
            // This is an example of how to use Repositories in Services and/or Controllers
            // Delete if unnecessary. 
            var user = await userRepository.Add(new User
            {
                Email = "email",
                Name = "Name",
                Password = "pass",
            });

            var weatherForecasts = Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();

            return Ok(user);
        }
    }
}
