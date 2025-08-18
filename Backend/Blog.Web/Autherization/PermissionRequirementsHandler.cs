using System.IdentityModel.Tokens.Jwt;
using Blog.Core.UseCases;
using Microsoft.AspNetCore.Authorization;

namespace Blog.Web.Autherization;

public class PermissionRequirementsHandler(IServiceScopeFactory serviceScopeFactory) : AuthorizationHandler<PermissionRequirements>
{
    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionRequirements requirement)
    {
        var userId = context.User.Claims
            .FirstOrDefault(x => x.Type == "guid");

        if (userId == null)
        {
            Console.WriteLine("No valid user ID found");
            return;
        }
        
        if (!Guid.TryParse(userId.Value, out var userGuid))
        {
            Console.WriteLine("Failed to parse user ID as GUID");
            return;
        }

        using var scope = serviceScopeFactory.CreateScope();
        var userRepository = scope.ServiceProvider.GetRequiredService<IUserRepository>();
        var permissions = await userRepository.FindPermissionsById(userGuid);
        
        if (permissions != null && permissions.Any(p => p == requirement.Permission))
        {
            context.Succeed(requirement);
        }
    }
}