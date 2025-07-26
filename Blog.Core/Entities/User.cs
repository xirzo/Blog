namespace Blog.Core.Entities;

public record User(Guid Id, string Name, string PasswordHash);