using Blog.Core.Domain.Repositories;
using Blog.Core.Domain.Entities;
using Blog.IO.Db;
using Microsoft.EntityFrameworkCore;

namespace Blog.IO.Repositories;

public class DbPostRepository(BlogDbContext context) : IPostRepository
{
    public async Task<Post?> CreateAsync(Post post)
    {
        context.Posts.Add(post);
        await context.SaveChangesAsync();
        return post;
    }

    public async Task<Post[]> GetAllAsync()
    {
        return await context.Posts
            .Include(blog => blog.Author)
            .ToArrayAsync();
    }

    public async Task<Post?> GetByIdAsync(Guid id)
    {
        return await context.Posts
            .Include(blog => blog.Author)
            .FirstOrDefaultAsync(blog => blog.Id == id);
    }

    public async Task<Post[]> GetByUserIdAsync(Guid userId)
    {
        return await context.Posts.
            Include(blog => blog.Author)
            .Where(blog => blog.Author != null && blog.Author.Id == userId)
            .ToArrayAsync();
    }

    public async Task<bool> DeleteByIdAsync(Guid id)
    {
        var blog = await context.FindAsync<Post>(id);

        if (blog == null)
        {
            return false;
        }

        context.Posts.Remove(blog);
        await context.SaveChangesAsync();
        return true;
    }
    
    public async Task<Post?> UpdateAsync(Post post)
    {
        context.Posts.Update(post);
        await context.SaveChangesAsync();
        return post;
    }
}
