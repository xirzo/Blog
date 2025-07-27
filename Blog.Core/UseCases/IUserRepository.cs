using Blog.Core.Entities;

namespace Blog.Core.UseCases;

public interface IUserRepository
{
    Task<User?> AddAsync(User user);
    Task<User?> FindByIdAsync(Guid id);
}