using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models;

[PrimaryKey(nameof(Id))]
public class Token
{
    public int Id { get; set; }
    public string Value { get; set; }
    public string UserId { get; set; }
    public DateTime ExpiryDate { get; set; }
}
