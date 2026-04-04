using Blog.Application.Models;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Blog.Application.Abstractions.Persistence.Repositories;

public interface IUserRepository
{
    Task<User> AddAsync(User user, CancellationToken cancellationToken);

    Task<User?> FindByUserIdAsync(Guid userId, CancellationToken cancellationToken);

    Task<User?> FindByEmailAsync(string email, CancellationToken cancellationToken);
}