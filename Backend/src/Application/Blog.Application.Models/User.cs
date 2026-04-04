using System;

namespace Blog.Application.Models;

public sealed record User
{
    public Guid UserId { get; init; }

    public required string Email { get; init; }

    public required string Name { get; init; }

    public required string PasswordHash { get; init; }

    public string Role { get; init; } = string.Empty;
}