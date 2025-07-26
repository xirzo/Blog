using Blog.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Blog.IO.Db;

public class BlogDbContext(DbContextOptions<BlogDbContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
}