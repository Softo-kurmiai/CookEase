﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    [PrimaryKey(nameof(Id))]
    public class Recipe
    {
        public long Id { get; set; }
        [ForeignKey(nameof(User))]
        public long CreatorId { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required string Contents { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public byte[]? Image { get; set; }
    }
}