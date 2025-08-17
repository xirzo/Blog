namespace Blog.Core.Entities;
public class User
{
    public Guid Id { get; set; }
    public required string Email { get; set; }
    public required string Name { get; set; }
    public required string PasswordHash { get; set; }
}
