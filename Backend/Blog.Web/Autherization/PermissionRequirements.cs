using Microsoft.AspNetCore.Authorization;

namespace Blog.Web.Autherization;

public class PermissionRequirements : IAuthorizationRequirement
{
    public string Permission { get; }
    
    public PermissionRequirements(string permission)
    {
        Permission = permission;
    }
}