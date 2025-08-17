using Blog.Core.UseCases;
using Blog.IO.Db;
using Microsoft.EntityFrameworkCore;

namespace Blog.IO.Repositories;

public class DbBlogRepository(BlogDbContext context) : IBlogRepository
{
    public async Task<Core.Entities.Blog?> CreateAsync(Core.Entities.Blog blog)
    {
        context.Blogs.Add(blog);
        await context.SaveChangesAsync();
        return blog;
    }

    public async Task<Core.Entities.Blog[]> GetAllAsync()
    {
        return await context.Blogs
            .Include(blog => blog.Author)
            .ToArrayAsync();
    }

    public async Task<Core.Entities.Blog?> GetByIdAsync(Guid id)
    {
        return await context.Blogs
            .Include(blog => blog.Author)
            .FirstOrDefaultAsync(blog => blog.Id == id);
    }

    public async Task<Core.Entities.Blog[]> GetByUserIdAsync(Guid userId)
    {
        return await context.Blogs.
            Include(blog => blog.Author)
            .Where(blog => blog.Author != null && blog.Author.Id == userId)
            .ToArrayAsync();
    }

    public async Task<bool> DeleteByIdAsync(Guid id)
    {
        var blog = await context.FindAsync<Core.Entities.Blog>(id);

        if (blog == null)
        {
            return false;
        }

        context.Blogs.Remove(blog);
        await context.SaveChangesAsync();
        return true;
    }
    
    public async Task<Core.Entities.Blog?> UpdateAsync(Guid id, string? name, string? description, string? markdownContent)
    {
        var blog = context.Blogs.FirstOrDefault(blog => blog.Id == id);

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
