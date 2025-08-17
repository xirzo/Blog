using Blog.Core.UseCases;
using Blog.IO.Db;
using Microsoft.EntityFrameworkCore;

namespace Blog.IO.Repositories;

public class DbPostRepository(BlogDbContext context) : IPostRepository
{
    public async Task<Core.Entities.Post?> CreateAsync(Core.Entities.Post post)
    {
        context.Posts.Add(post);
        await context.SaveChangesAsync();
        return post;
    }

    public async Task<Core.Entities.Post[]> GetAllAsync()
    {
        return await context.Posts
            .Include(blog => blog.Author)
            .ToArrayAsync();
    }

    public async Task<Core.Entities.Post?> GetByIdAsync(Guid id)
    {
        return await context.Posts
            .Include(blog => blog.Author)
            .FirstOrDefaultAsync(blog => blog.Id == id);
    }

    public async Task<Core.Entities.Post[]> GetByUserIdAsync(Guid userId)
    {
        return await context.Posts.
            Include(blog => blog.Author)
            .Where(blog => blog.Author != null && blog.Author.Id == userId)
            .ToArrayAsync();
    }

    public async Task<bool> DeleteByIdAsync(Guid id)
    {
        var blog = await context.FindAsync<Core.Entities.Post>(id);

        if (blog == null)
        {
            return false;
        }

        context.Posts.Remove(blog);
        await context.SaveChangesAsync();
        return true;
    }
    
    public async Task<Core.Entities.Post?> UpdateAsync(Guid id, string? name, string? description, string? markdownContent)
    {
        var blog = context.Posts.FirstOrDefault(blog => blog.Id == id);

        if (blog == null)
        {
            return null;
        }
        
        if (name != null)
        {
            blog.Name = name;
        }

        if (description != null)
        {
            blog.Description = description;
        }

        if (markdownContent != null)
        {
            blog.MarkdownContent = markdownContent;
        }
        
        await context.SaveChangesAsync();
        return blog;
    }
}
