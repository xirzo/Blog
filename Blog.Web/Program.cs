using Blog.IO.Extensions;

var builder = WebApplication.CreateBuilder(args);

var dbConnection = Environment.GetEnvironmentVariable("DB_CONNECTION");

if (dbConnection == null)
{
    return;
}

builder.Services.AddDatabase(dbConnection);
var app = builder.Build();
app.Run();