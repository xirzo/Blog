using Blog.Presentation.Rest.Autherization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;

namespace Blog.Presentation.Rest;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddRest(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddControllers();

        IConfigurationSection jwt = configuration.GetRequiredSection("Jwt");
        string key = jwt["Key"] ?? throw new InvalidOperationException("Jwt:Key is not configured.");
        string issuer = jwt["Issuer"] ?? throw new InvalidOperationException("Jwt:Issuer is not configured.");
        string audience = jwt["Audience"] ?? throw new InvalidOperationException("Jwt:Audience is not configured.");

        services
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.MapInboundClaims = false;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = issuer,
                    ValidAudience = audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
                    RoleClaimType = "role",
                };
            });

        services.AddAuthorization(options =>
        {
            options.AddPolicy(
                BlogPermissions.Create,
                policy => policy.RequireClaim("role", BlogPermissions.AuthorRole));

            options.AddPolicy(
                BlogPermissions.Update,
                policy => policy.RequireClaim("role", BlogPermissions.AuthorRole));

            options.AddPolicy(
                BlogPermissions.Delete,
                policy => policy.RequireClaim("role", BlogPermissions.AuthorRole));
        });

        return services;
    }
}