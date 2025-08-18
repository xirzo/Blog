using Blog.Core.Entities;

namespace Blog.Core.UseCases;

public interface IUserRepository
{
    Task<User?> AddAsync(User user);
    Task<User?> FindByIdAsync(Guid id);
    Task<User?> FindByEmailAsync(string email);
    Task<ICollection<string>?> FindPermissionsById(Guid id);
}