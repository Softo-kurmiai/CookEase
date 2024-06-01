using Infrastructure.Models;

namespace Infrastructure.Interfaces
{
    public interface ICommentLikeRepository
    {
        Task<int> GetCommentLikes(int commentId);
        Task CreateCommentLike(int commentId, int userId);
        Task DeleteCommentLike(int commentId, int userId);
    }
}
