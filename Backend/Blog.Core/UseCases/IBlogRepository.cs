namespace Blog.Core.UseCases;

public interface IBlogRepository
{
    Task<Entities.Blog?> AddAsync(Entities.Blog blog);
    Task<Entities.Blog[]> GetAllAsync();
}