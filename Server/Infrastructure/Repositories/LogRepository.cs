using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Interfaces;

namespace Infrastructure.Repositories;

public class LogRepository : GenericRepository<Log>, ILogRepository
{
    private readonly DbSet<Log> _logs;

    public LogRepository(AppDbContext context) : base(context)
    {
        _logs = context.Set<Log>();
    }
}
