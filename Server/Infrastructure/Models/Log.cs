using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Models;

[PrimaryKey(nameof(Id))]
public class Log
{
    public int Id { get; set; }

    public DateTime Timestamp { get; set; }

    public string? Message { get; set; }

    public int UserId { get; set; }
}
