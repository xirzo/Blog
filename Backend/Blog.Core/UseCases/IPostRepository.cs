using Blog.Core.Entities;

namespace Blog.Core.UseCases;

public interface IPostRepository
{
    Task<Post[]> GetAll();
}
