using Infrastructure.Models;

namespace Infrastructure.Interfaces;

public interface IRecipeRepository : IGenericRepository<Recipe>
{
    Task<List<Recipe>?> GetRecipesByCreatorId(int id);

    Task<Recipe?> IncreaseRecipeViewCount(int recipeId);

    Task<Recipe?> IncreaseRecipeFavoriteCount(int recipeId);

    Task<Recipe?> DecreaseRecipeFavoriteCount(int recipeId);
}