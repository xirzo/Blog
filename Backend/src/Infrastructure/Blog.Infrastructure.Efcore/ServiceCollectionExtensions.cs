using Blog.Application.Abstractions.Persistence;
using Blog.Application.Abstractions.Persistence.Repositories;
using Blog.Infrastructure.Efcore.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace Blog.Infrastructure.Efcore;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddEfcore(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<BlogDbContext>((_, options) =>
        {
            string? connectionString = configuration.GetConnectionString("DefaultConnection");

            if (string.IsNullOrWhiteSpace(connectionString))
            {
                throw new InvalidOperationException("Connection string env is not set.");
            }

            options.UseNpgsql(connectionString);
        });

        services.AddScoped<IPersistenceContext, EfcorePersistenceContext>();
        services.AddScoped<IPostRepository, EfcorePostRepository>();
        services.AddScoped<IUserRepository, EfcoreUserRepository>();
        return services;
    }
}