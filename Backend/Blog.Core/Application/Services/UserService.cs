using Blog.Core.Domain.Entities;
using Blog.Core.Domain.Repositories;

namespace Blog.Core.Application.Services;

public abstract record RegisterResult
{
    public record Success(User User) : RegisterResult;
    public record UserAlreadyExists(string Message) : RegisterResult;
    public record UserRepositoryError(string Message) : RegisterResult;
}

public abstract record LoginResult
{
    public record Success(string Token, User User) : LoginResult;
    public record WrongPassword(string Message) : LoginResult;
    public record UserNotFound(string Message) : LoginResult;
}

public class UserService
{
    private readonly IUserRepository _userRepository;
    private readonly JwtService _jwtService;

    public UserService(IUserRepository userRepository, JwtService jwtService)
    {
        _userRepository = userRepository;
        _jwtService = jwtService;
    }

    public async Task<RegisterResult> Register(string name, string email, string password)
    {
        var existingUser = await _userRepository.FindByEmailAsync(email);

        if (existingUser != null)
        {
            return new RegisterResult.UserAlreadyExists("User already exists with this email.");
        }
        
        User user;
        try
        {
            user = User.Create(name, email, password);
        }
        catch (ArgumentException ex)
        {
            return new RegisterResult.UserRepositoryError(ex.Message);
        }

        var addedUser = await _userRepository.AddAsync(user);

        if (addedUser == null)
        {
            return new RegisterResult.UserRepositoryError("Failed to add user to the repository.");
        }

        return new RegisterResult.Success(addedUser);
    }

    public async Task<LoginResult> Login(string email, string password)
    {
        var user = await _userRepository.FindByEmailAsync(email);

        if (user == null)
        {
            return new LoginResult.UserNotFound($"User not found: {email}");
        }

        if (!user.VerifyPassword(password))
        {
            return new LoginResult.WrongPassword("Wrong password");
        }

        var token = _jwtService.GenerateJwtToken(user);

        return new LoginResult.Success(token, user);
    }
}
