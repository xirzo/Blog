namespace Blog.Core.UseCases;

public interface IBlogRepository
{
    Task<Entities.Blog?> AddAsync(Entities.Blog blog);
    Task<Entities.Blog[]> GetAllAsync();
    Task<Entities.Blog?> GetByIdAsync(Guid id);
    Task<Entities.Blog[]> GetByUserIdAsync(Guid userId);
    Task<bool> DeleteByIdAsync(Guid id);
    Task<Entities.Blog?> UpdateAsync(Guid id, string? name, string? description, string? markdownContent);
}
