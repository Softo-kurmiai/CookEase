using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories;

public class LogRepository : GenericRepository<Log>
{
    private readonly DbSet<Log> _logs;
    private readonly AppDbContext _context;

    public LogRepository(AppDbContext context) : base(context)
    {
        _context = context;
    }
}
