using Blog.Core.Domain.ValueObjects;

namespace Blog.Core.Domain.Entities;

public class User
{
    public Guid Id { get; private set; }
    public Email Email { get; private set; }
    public string Name { get; private set; }
    public HashedPassword PasswordHash { get; private set; }
    public ICollection<string> Permissions { get; private set; }

    // EF Core constructor
    private User()
    {
        Email = null!;
        Name = null!;
        PasswordHash = null!;
        Permissions = new List<string>();
    }

    private User(Guid id, Email email, string name, HashedPassword passwordHash)
    {
        Id = id;
        Email = email;
        Name = name;
        PasswordHash = passwordHash;
        Permissions = new List<string>();
    }

    public static User Create(string name, string email, string password)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Name cannot be empty", nameof(name));

        var userEmail = Email.Create(email);
        var hashedPassword = HashedPassword.Create(password);

        return new User(Guid.NewGuid(), userEmail, name, hashedPassword);
    }

    public static User Restore(Guid id, Email email, string name, HashedPassword passwordHash, ICollection<string> permissions)
    {
        var user = new User(id, email, name, passwordHash)
        {
            Permissions = permissions
        };
        return user;
    }

    public bool VerifyPassword(string password)
    {
        return PasswordHash.Verify(password);
    }

    public void AddPermission(string permission)
    {
        if (string.IsNullOrWhiteSpace(permission))
            throw new ArgumentException("Permission cannot be empty", nameof(permission));

        if (!Permissions.Contains(permission))
        {
            Permissions.Add(permission);
        }
    }

    public void RemovePermission(string permission)
    {
        Permissions.Remove(permission);
    }

    public bool HasPermission(string permission)
    {
        return Permissions.Contains(permission);
    }
}
