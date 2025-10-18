using Blog.Core.Domain.Entities;

namespace Blog.Core.Domain.Repositories;

public interface IPostRepository
{
    Task<Post?> CreateAsync(Post post);
    Task<Post[]> GetAllAsync();
    Task<Post?> GetByIdAsync(Guid id);
    Task<Post[]> GetByUserIdAsync(Guid userId);
    Task<bool> DeleteByIdAsync(Guid id);
    Task<Post?> UpdateAsync(Post post);
}
