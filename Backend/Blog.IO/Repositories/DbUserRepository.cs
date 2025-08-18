using Blog.Core.Entities;
using Blog.Core.UseCases;
using Blog.IO.Db;
using Microsoft.EntityFrameworkCore;

namespace Blog.IO.Repositories;

public class DbUserRepository(BlogDbContext context) : IUserRepository
{
    public async Task<User?> AddAsync(User user)
    {
        var addedUser= await context.Users.AddAsync(user);
        var result = await context.SaveChangesAsync();

        if (result <= 0)
        {
            return null;
        }

        return addedUser.Entity;
    }

    public async Task<User?> FindByIdAsync(Guid id)
    {
        return await context.Users.FirstOrDefaultAsync(user => user.Id == id);
    }

    public async Task<User?> FindByEmailAsync(string email)
    {
        return await context.Users.FirstOrDefaultAsync(user => user.Email == email);
    }
    
    public async Task<ICollection<string>?> FindPermissionsById(Guid id)
    {
        var user = await context.Users.FirstOrDefaultAsync(u => u.Id == id);
        
        if (user == null)
        {
            return null;
        }
        
        return user.Permissions;
    }
}