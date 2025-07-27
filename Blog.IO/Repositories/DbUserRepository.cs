using Blog.Core.Entities;
using Blog.Core.UseCases;
using Blog.IO.Db;
using Microsoft.EntityFrameworkCore;

namespace Blog.IO.Repositories;

public class DbUserRepository(BlogDbContext context) : IUserRepository
{
    public async Task<bool> AddAsync(User user)
    {
        await context.Users.AddAsync(user);
        var result = await context.SaveChangesAsync();
        return result > 0;
    }

    public async Task<User?> FindByIdAsync(Guid id)
    {
        return await context.Users.FirstOrDefaultAsync(user => user.Id == id);
    }
}