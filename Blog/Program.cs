// TODO: user registration and login
// TODO: home page and pagination for it
// TODO: creating posts (for host)
// TODO: search posts by tags
// TODO: comments

using System.Diagnostics;
using Blog.Core.UseCases;
using Blog.IO.Db;
using Blog.IO.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Blog;
internal class Program
{
    private static string _dbConnection = string.Empty;
    
    private static void Main()
    {
        var dbConnection = Environment.GetEnvironmentVariable("DB_CONNECTION");

        if (dbConnection == null)
        {
            Debug.WriteLine("ERROR: Connection string is environment variable is not set");
            return;
        }

        _dbConnection = dbConnection;
        
        var serviceCollection = new ServiceCollection();
        ConfigureServices(serviceCollection);
        var serviceProvider = serviceCollection.BuildServiceProvider();

        var logger = serviceProvider.GetRequiredService<ILogger<Program>>();

        logger.LogInformation("Application started successfully.");        
    }

    private static void ConfigureServices(IServiceCollection services)
    {
        services.AddDbContext<BlogDbContext>(options => options.UseNpgsql(_dbConnection));
        services.AddSingleton<IUserRepository, DbUserRepository>();
        services.AddLogging(builder => builder.AddConsole());
    }
}