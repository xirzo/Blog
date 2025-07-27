using System.Net;
using Blog.Core.UseCases;
using Blog.IO.Extensions;
using Blog.IO.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDatabase();
builder.Services.AddControllers();
builder.Services.AddScoped<IUserRepository, DbUserRepository>();

builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.Listen(IPAddress.Any, 5000);
});

var app = builder.Build();

app.UseAuthorization();
app.MapControllers();

app.Run();