using Blog.Application.Models;
using Blog.Infrastructure.Efcore.Configurations;
using Microsoft.EntityFrameworkCore;

namespace Blog.Infrastructure.Efcore;

public class BlogDbContext(DbContextOptions<BlogDbContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }

    public DbSet<Post> Posts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new UserConfiguration());
        modelBuilder.ApplyConfiguration(new PostConfiguration());
        base.OnModelCreating(modelBuilder);
    }
}