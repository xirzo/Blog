namespace Blog.Core.Entities;


/* Test permissions, all of these
 need to be registered inside Program.cs, 
 then added to individual user inside db. 
 In order to allow access for this role, add
 attribute with policy inside the controller 
*/
public static class Permissions
{
    public const string Create = nameof(Create);
    public const string Update = nameof(Update);
    public const string Delete = nameof(Delete);
}