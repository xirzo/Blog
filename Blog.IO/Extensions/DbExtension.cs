using Blog.IO.Db;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Blog.IO.Extensions;

public static class DbExtension
{
    public static void AddDatabase(this IServiceCollection services, string connectionString)
    {
        services.AddDbContext<BlogDbContext>(options =>
        {
            options.UseNpgsql(connectionString);
        });
    }
}