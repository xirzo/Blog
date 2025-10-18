using Blog.Core.Domain.Entities;

namespace Blog.Core.Domain.Repositories;

public interface IUserRepository
{
    Task<User?> AddAsync(User user);
    Task<User?> FindByIdAsync(Guid id);
    Task<User?> FindByEmailAsync(string email);
    Task<ICollection<string>?> FindPermissionsById(Guid id);
}
