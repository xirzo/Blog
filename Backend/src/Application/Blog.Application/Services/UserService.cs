using Blog.Application.Abstractions.Persistence;
using Blog.Application.Contracts.Users;
using Blog.Application.Contracts.Users.Models;
using Blog.Application.Contracts.Users.Operations;
using Blog.Application.Helpers.Jwt;
using Blog.Application.Models;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Blog.Application.Services;

public class UserService : IUserService
{
    private readonly IPersistenceContext _context;
    private readonly JwtHelper _jwtHelper;

    public UserService(IPersistenceContext context, JwtHelper jwtHelper)
    {
        _context = context;
        _jwtHelper = jwtHelper;
    }

    public async Task<RegisterUser.Response> RegisterAsync(RegisterUser.Request request, CancellationToken cancellationToken)
    {
        User? existingUser = await _context.UserRepository.FindByEmailAsync(request.Email, cancellationToken);

        if (existingUser != null)
        {
            return new RegisterUser.Response.UserAlreadyExists("User already exists with this email.");
        }

        var user = new User
        {
            UserId = Guid.NewGuid(),
            Email = request.Email,
            Name = request.Name,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            Role = "Regular",
        };

        User addedUser = await _context.UserRepository.AddAsync(user, cancellationToken);

        return new RegisterUser.Response.Success(new UserDto(addedUser.UserId, addedUser.Email, addedUser.Name));
    }

    public async Task<LoginUser.Response> LoginAsync(LoginUser.Request request, CancellationToken cancellationToken)
    {
        User? user = await _context.UserRepository.FindByEmailAsync(request.Email, cancellationToken);

        if (user == null)
        {
            return new LoginUser.Response.UserNotFound($"User not found: {request.Email}");
        }

        if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            return new LoginUser.Response.WrongPassword("Wrong password.");
        }

        string token = _jwtHelper.GenerateJwtToken(user);

        return new LoginUser.Response.Success(token);
    }
}