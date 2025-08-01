namespace Blog.Core.Entities;

public record User(Guid Id, string Email, string Name, string PasswordHash);