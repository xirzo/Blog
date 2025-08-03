using Blog.Core.Entities;
using Blog.Core.UseCases;
using Blog.IO.Db;
using Microsoft.EntityFrameworkCore;

namespace Blog.IO.Repositories;

public class DbPostRepository(BlogDbContext context) : IPostRepository
{
    private readonly BlogDbContext _context = context;

    public async Task<Post[]> GetBlogPostsAsync(Guid blogId)
    {
        return await _context.Blogs
            .Where(blog => blog.Id == blogId)
            .SelectMany(blog => blog.Posts)
            .ToArrayAsync();
    }
}
