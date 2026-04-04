using Blog.Application;
using Blog.Infrastructure.Efcore;
using Blog.Presentation.Rest;
using Microsoft.AspNetCore.Builder;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddApplication(builder.Configuration)
    .AddEfcore(builder.Configuration)
    .AddRest(builder.Configuration);

WebApplication app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();