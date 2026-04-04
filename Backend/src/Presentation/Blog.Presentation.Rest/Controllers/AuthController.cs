using Blog.Application.Contracts.Users;
using Blog.Application.Contracts.Users.Operations;
using Blog.Presentation.Rest.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;

namespace Blog.Presentation.Rest.Controllers;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;

    public AuthController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterModel model, CancellationToken cancellationToken)
    {
        RegisterUser.Response result =
            await _userService.RegisterAsync(
                new RegisterUser.Request(model.Name, model.Email, model.Password),
                cancellationToken);

        return result switch
        {
            RegisterUser.Response.Success success => Ok(new
            {
                success.Token,
                User = new { success.User.UserId, success.User.Name, success.User.Email },
            }),
            RegisterUser.Response.UserAlreadyExists userAlreadyExists => Conflict(new
                { message = userAlreadyExists.Message, }),
            RegisterUser.Response.UserRepositoryError userRepositoryError => BadRequest(new
                { message = userRepositoryError.Message, }),
            _ => BadRequest(),
        };
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model, CancellationToken cancellationToken)
    {
        LoginUser.Response result =
            await _userService.LoginAsync(new LoginUser.Request(model.Email, model.Password), cancellationToken);

        return result switch
        {
            LoginUser.Response.Success success => Ok(new
            {
                success.Token,
                User = new { success.User.UserId, success.User.Name, success.User.Email },
            }),
            LoginUser.Response.UserNotFound userNotFound => NotFound(new { message = userNotFound.Message }),
            LoginUser.Response.WrongPassword wrongPassword => Unauthorized(new { message = wrongPassword.Message }),
            _ => BadRequest(),
        };
    }
}