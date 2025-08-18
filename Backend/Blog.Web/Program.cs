using System.Net;
using Blog.Core.Entities;
using Blog.Core.Services;
using Blog.Core.UseCases;
using Blog.IO.Extensions;
using Blog.IO.Repositories;
using Blog.Web.Autherization;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
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

var allowedOrigin = builder.Configuration["FrontendOrigin"] ?? "http://localhost:3000";

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(allowedOrigin)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme,
        options => builder.Configuration.Bind("JwtSettings", options))
    .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme,
        options => builder.Configuration.Bind("CookieSettings", options));

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy(Permissions.Create, policy => policy.Requirements.Add(new PermissionRequirements(Permissions.Create)));
    options.AddPolicy(Permissions.Update, policy => policy.Requirements.Add(new PermissionRequirements(Permissions.Update)));
    options.AddPolicy(Permissions.Delete, policy => policy.Requirements.Add(new PermissionRequirements(Permissions.Delete)));
});

builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.Listen(IPAddress.Any, 5000);
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

app.Run();