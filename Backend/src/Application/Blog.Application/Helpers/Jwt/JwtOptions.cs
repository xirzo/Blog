namespace Blog.Application.Helpers.Jwt;

public class JwtOptions
{
    public required string Key { get; init; }

    public required string Issuer { get; init; }

    public required string Audience { get; init; }

    public int ExpiresInHours { get; init; } = 2;
}