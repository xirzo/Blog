using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Blog.Infrastructure.Efcore;

public class BlogDbContextFactory : IDesignTimeDbContextFactory<BlogDbContext>
{
    public BlogDbContext CreateDbContext(string[] args)
    {
        DbContextOptions<BlogDbContext> options = new DbContextOptionsBuilder<BlogDbContext>()
            .UseNpgsql("Host=localhost;Database=blog;Username=postgres;Password=postgres")
            .Options;

        return new BlogDbContext(options);
    }
}
