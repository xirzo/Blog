using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Blog.Core.Entities;
using Blog.Core.Services;
using Blog.Core.UseCases;
using Blog.IO.Db;
using Blog.IO.Extensions;
using Blog.IO.Repositories;
using Blog.Web.Autherization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

builder.Services.AddDatabase();
builder.Services.AddControllers();
builder.Services.AddScoped<IUserRepository, DbUserRepository>();
builder.Services.AddScoped<IPostRepository, DbPostRepository>();
builder.Services.AddScoped<JwtService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddSingleton<IAuthorizationHandler, PermissionRequirementsHandler>();

var allowedOrigin = Environment.GetEnvironmentVariable("FRONTEND_ORIGIN");

if (string.IsNullOrWhiteSpace(allowedOrigin))
{
    throw new InvalidOperationException("No frontend origin env provided (FRONTEND_ORIGIN)");
}

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(allowedOrigin)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
    {
        var jwtKey = Environment.GetEnvironmentVariable("JWT_KEY");
        var jwtIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER");
        var jwtAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE");

        Debug.Assert(jwtKey != null, nameof(jwtKey) + " != null");

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtAudience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };

        options.MapInboundClaims = false;
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy(Permissions.Create, policy => policy.Requirements.Add(new PermissionRequirements(Permissions.Create)));
    options.AddPolicy(Permissions.Update, policy => policy.Requirements.Add(new PermissionRequirements(Permissions.Update)));
    options.AddPolicy(Permissions.Delete, policy => policy.Requirements.Add(new PermissionRequirements(Permissions.Delete)));
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<BlogDbContext>();
    db.Database.Migrate();
}

app.Run();
