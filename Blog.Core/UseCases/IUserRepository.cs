using Blog.Core.Entities;

namespace Blog.Core.UseCases;

public interface IUserRepository
{
    Task<bool> Add(User user);
    Task<User?> FindById(Guid id);
}