using Blog.Core.Entities;

namespace Blog.Core.UseCases;

public interface IUserRepository
{
    Task<bool> AddAsync(User user);
    Task<User?> FindByIdAsync(Guid id);
}