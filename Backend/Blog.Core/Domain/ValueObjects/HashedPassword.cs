namespace Blog.Core.Domain.ValueObjects;

public record HashedPassword
{
    public string Value { get; }

    private HashedPassword(string value)
    {
        Value = value;
    }

    public static HashedPassword Create(string plainPassword)
    {
        if (string.IsNullOrWhiteSpace(plainPassword))
            throw new ArgumentException("Password cannot be empty", nameof(plainPassword));

        if (plainPassword.Length < 6)
            throw new ArgumentException("Password must be at least 6 characters", nameof(plainPassword));

        var hash = BCrypt.Net.BCrypt.HashPassword(plainPassword);
        return new HashedPassword(hash);
    }

    public static HashedPassword FromHash(string hash)
    {
        if (string.IsNullOrWhiteSpace(hash))
            throw new ArgumentException("Hash cannot be empty", nameof(hash));

        return new HashedPassword(hash);
    }

    public bool Verify(string plainPassword)
    {
        return BCrypt.Net.BCrypt.Verify(plainPassword, Value);
    }

    public override string ToString() => Value;
}
