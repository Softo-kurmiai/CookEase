using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    [PrimaryKey(nameof(Id))]
    public class User
    {
        public long Id { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public ICollection<Recipe>? Recipes { get; } = new List<Recipe>();
        public ICollection<Collection>? Collections { get; } = new List<Collection>();
        public ICollection<User>? FavoriteCreators { get; } = new List<User>();
        public ICollection<Recipe>? FavoriteRecipes { get; } = new List<Recipe>();
        public ICollection<Comment>? Comments { get; } = new List<Comment>();
        public ICollection<CommentLike>? CommentLikes { get; } = new List<CommentLike>();
        public ICollection<User>? Followers { get; } = new List<User>();
    }
}
