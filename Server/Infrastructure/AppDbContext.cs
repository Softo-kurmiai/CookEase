using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public required DbSet<Collection> Collections { get; set; }

    public required DbSet<CollectionRecipe> CollectionRecipes { get; set; }

    public required DbSet<Comment> Comments { get; set; }

    public required DbSet<CommentLike> CommentLikes { get; set; }

    public required DbSet<FavoriteCreator> FavoriteCreators { get; set; }

    public required DbSet<FavoriteRecipe> FavoriteRecipes { get; set; }

    public required DbSet<Label> Labels { get; set; }

    public required DbSet<RecipeCategory> RecipeLabels { get; set; }

    public required DbSet<Recipe> Recipes { get; set; }

    public required DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql("Host=localhost,5432;Database=cookease-db;Port=5432;Username=postgres;Password=password;");
        base.OnConfiguring(optionsBuilder);
    }
}