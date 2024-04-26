using Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure
{
    public class DbInitializer
    {
        // Still unfinished Database Initializer
        public static void Initialize(AppDbContext context)
        {
            context.Database.EnsureCreated();

            if (context.Users.Any())
            {
                return;
            }

            for(var i=0; i<10; i++)
            {
                var user = new User { Name = "Username" + i, Email = "Email" + i, Password = "Password" + i };
                context.Users.Add(user);
            }
            context.SaveChanges();

            for (var i = 0; i < 10; i++)
            {
                User? user = context.Users.Where(x => x.Name == "Username" + i).FirstOrDefault();
                var recipe = new Recipe { Name = "RecipeName" + i, Contents = "RecipeContents" + i, Description = "RecipeDescription" + i };
                context.Recipes.Add(recipe);
            }
            context.SaveChanges();
        }
    }
}
