using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure
{
    public class AppDbContext(DbContextOptions options) : DbContext(options)
    {
        public required DbSet<Recipe> Recipes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var recipe = modelBuilder.Entity<Recipe>();
            recipe.HasKey(x => x.Id);
            recipe.HasIndex(x => x.Name);
            recipe.HasOne(x => x.Creator).WithMany(x => x.Recipes);
            recipe.HasMany(x => x.Labels).WithMany(x => x.Recipes);
            recipe.HasMany(x => x.Comments).WithOne(x => x.Recipe);
            recipe.HasMany(x => x.FollowerUsers).WithMany(x => x.FavoriteRecipes).UsingEntity<FavoriteRecipe>(
                x => x.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP"));
            recipe.HasMany(x => x.AddedCollections).WithMany(x => x.Recipes).UsingEntity<CollectionRecipe>(
                x => x.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP"));

            var user = modelBuilder.Entity<User>();
            user.HasKey(x => x.Id);
            user.HasIndex(x => x.Name);
            user.HasIndex(x => x.Email);
            user.HasMany(x => x.Recipes).WithOne(x => x.Creator);
            user.HasMany(x => x.Collections).WithOne(x => x.User);
            user.HasMany(x => x.FavoriteCreators).WithMany(x => x.Followers).UsingEntity<FavoriteCreator>(
                x => x.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP"));
            user.HasMany(x => x.FavoriteRecipes).WithMany(x => x.FollowerUsers).UsingEntity<FavoriteRecipe>(
                x => x.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP"));
            user.HasMany(x => x.Comments).WithOne(x => x.User);
            user.HasMany(x => x.CommentLikes).WithOne(x => x.User);
            user.HasMany(x => x.Followers).WithMany(x => x.FavoriteCreators).UsingEntity<FavoriteCreator>(
                x => x.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP"));

            var collection = modelBuilder.Entity<Collection>();
            collection.HasKey(x => x.Id);
            collection.HasOne(x => x.User).WithMany(x => x.Collections);
            collection.HasMany(x => x.Recipes).WithMany(x => x.AddedCollections).UsingEntity<CollectionRecipe>(
                x => x.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP"));

            var comment = modelBuilder.Entity<Comment>();
            comment.HasKey(x => x.Id);
            comment.HasOne(x => x.User).WithMany(x => x.Comments);
            comment.HasOne(x => x.Recipe).WithMany(x => x.Comments);
            comment.HasMany(x => x.CommentLikes).WithOne(x => x.Comment);

            var commentLike = modelBuilder.Entity<CommentLike>();
            commentLike.HasOne(x => x.User).WithMany(x => x.CommentLikes);
            commentLike.HasOne(x => x.Comment).WithMany(x => x.CommentLikes);

            var label = modelBuilder.Entity<Label>();
            label.HasKey(x => x.Id);
            label.HasMany(x => x.Recipes).WithMany(x => x.Labels);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=localhost,5432;Database=cookease-db;Port=5432;Username=postgres;Password=password;");
            base.OnConfiguring(optionsBuilder);
        }
    }
}
