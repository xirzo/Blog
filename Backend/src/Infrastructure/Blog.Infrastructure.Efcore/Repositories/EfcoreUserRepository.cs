using Blog.Application.Abstractions.Persistence.Repositories;
using Blog.Application.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Blog.Infrastructure.Efcore.Repositories;

public class EfcoreUserRepository(BlogDbContext context) : IUserRepository
{
    public async Task<User> AddAsync(User user, CancellationToken cancellationToken)
    {
        EntityEntry<User> addedUser = await context.Users.AddAsync(user, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);
        return addedUser.Entity;
    }

    public async Task<User?> FindByUserIdAsync(Guid userId, CancellationToken cancellationToken)
    {
        return await context.Users.FirstOrDefaultAsync(user => user.UserId == userId, cancellationToken);
    }

    public async Task<User?> FindByEmailAsync(string email, CancellationToken cancellationToken)
    {
        return await context.Users.FirstOrDefaultAsync(user => user.Email == email, cancellationToken);
    }
}