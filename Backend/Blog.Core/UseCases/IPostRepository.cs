namespace Blog.Core.UseCases;

public interface IPostRepository
{
    Task<Entities.Post?> CreateAsync(Entities.Post post);
    Task<Entities.Post[]> GetAllAsync();
    Task<Entities.Post?> GetByIdAsync(Guid id);
    Task<Entities.Post[]> GetByUserIdAsync(Guid userId);
    Task<bool> DeleteByIdAsync(Guid id);
    Task<Entities.Post?> UpdateAsync(Guid id, string? name, string? description, string? markdownContent);
}
