using Infrastructure.Models;
using Infrastructure.Repositories;

namespace CookEase.Api.Middleware
{
    public class LoggingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<LoggingMiddleware> _logger;
        private readonly LogRepository _logRepository;

        public LoggingMiddleware(RequestDelegate next, ILogger<LoggingMiddleware> logger, LogRepository logRepository)
        {
            _next = next;
            _logger = logger;
            _logRepository = logRepository;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);

                var logEntry = new Log
                {
                    Timestamp = DateTime.UtcNow,
                    Message = $"Request: {context.Request.Method} {context.Request.Path}",
                };

                await _logRepository.Add(logEntry);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message, ex.StackTrace);

                var logEntry = new Log
                {
                    Timestamp = DateTime.UtcNow,
                    Message = ex.Message,
                };

                await _logRepository.Add(logEntry);

                throw;
            }
        }
    }
}
