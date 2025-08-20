using Blog.Core.Helpers;
using Blog.IO.Db;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Blog.IO.Extensions;

public static class DbExtension
{
    public static void AddDatabase(this IServiceCollection services)
    {
        services.AddDbContext<BlogDbContext>((serviceProvider, options) =>
        {
            var connectionString = EnvironmentHelper.GetEnvironmentVariableOrFile("DB_CONNECTION_STRING");

            if (string.IsNullOrWhiteSpace(connectionString))
            {
                throw new InvalidOperationException("Connection string env is not set (DB_CONNECTION_STRING)");
            }


            options.UseNpgsql(connectionString);
        });
    }
}
