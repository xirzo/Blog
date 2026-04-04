using Blog.Application.Contracts.Posts;
using Blog.Application.Contracts.Users;
using Blog.Application.Helpers.Jwt;
using Blog.Application.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Blog.Application;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApplication(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<JwtOptions>(options =>
            configuration.GetSection("Jwt").Bind(options));

        services.AddScoped<JwtHelper>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IPostService, PostService>();
        return services;
    }
}