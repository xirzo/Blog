using Blog.Core.UseCases;
using Blog.IO.Db;
using Microsoft.EntityFrameworkCore;

namespace Blog.IO.Repositories;

public class DbBlogRepository(BlogDbContext context) : IBlogRepository
{
    private readonly BlogDbContext _context = context;

    public async Task<Core.Entities.Blog?> AddAsync(Core.Entities.Blog blog)
    {
        _context.Blogs.Add(blog);
        await _context.SaveChangesAsync();
        return blog;
    }

    public async Task<Core.Entities.Blog[]> GetAllAsync()
    {
        return await _context.Blogs
            .Include(blog => blog.Author)
            .ToArrayAsync();
    }

    public async Task<Core.Entities.Blog?> GetById(Guid id)
    {
        return await _context.Blogs
            .Include(blog => blog.Author)
            .FirstOrDefaultAsync(blog => blog.Id == id);
    }
}
