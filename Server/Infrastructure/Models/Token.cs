using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models;

[PrimaryKey(nameof(Id))]
public class Token
{
    public int Id { get; set; }
    
    public string Value { get; set; }
    
    [ForeignKey(nameof(User))]
    public int UserId { get; set; }
    
    public DateTime ExpiryDate { get; set; }
}
