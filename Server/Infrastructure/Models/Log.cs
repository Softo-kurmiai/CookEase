using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models;

[PrimaryKey(nameof(Id))]
public class Log
{
    public int Id { get; set; }
    public DateTime Timestamp { get; set; }
    public string? Message { get; set; }
    public int UserId { get; set; }
}
