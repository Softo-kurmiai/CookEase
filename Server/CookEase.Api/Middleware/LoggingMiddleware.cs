using Infrastructure.Interfaces;
using Infrastructure.Models;

namespace CookEase.Api.Middleware;

public class LoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<LoggingMiddleware> _logger;

    public LoggingMiddleware(
        RequestDelegate next,
        ILogger<LoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context, IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var logRepository = scope.ServiceProvider.GetRequiredService<ILogRepository>();

        try
        {
            await _next(context);

            var logEntry = new Log
            {
                Timestamp = DateTime.UtcNow,
                Message = $"Request: {context.Request.Method} {context.Request.Path}",
            };

            await logRepository.Add(logEntry);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message, ex.StackTrace);

            var logEntry = new Log
            {
                Timestamp = DateTime.UtcNow,
                Message = ex.Message,
            };

            await logRepository.Add(logEntry);

            throw;
        }
    }
}