using Blog.Web.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Blog.Core.Entities;
using Blog.Core.Services;
using Blog.Core.UseCases;

namespace Blog.Web.Controllers;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly UserService _userService;
    public AuthController(UserService userService)
    {
        _userService = userService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        RegisterResult result = await _userService.Register(dto.Name, dto.Email, dto.Password);

        return result switch
        {
            RegisterResult.Success success => Ok(new {success.User.Id, success.User.Name, success.User.Email}),
            RegisterResult.UserAlreadyExists userAlreadyExists => Conflict(new { message = userAlreadyExists.Message }),
            RegisterResult.UserRepositoryError userRepositoryError => BadRequest(new { message = userRepositoryError.Message }),
            _ => BadRequest()
        };
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        LoginResult result = await _userService.Login(dto.Email, dto.Password);

        return result switch
        {
            LoginResult.Success success=> Ok(new { success.Token, user = new {success.User.Id, success.User.Name, success.User.Email}}),
            LoginResult.UserNotFound userNotFound => NotFound(new { message = userNotFound.Message }),
            LoginResult.WrongPassword wrongPassword => Unauthorized(new { message = wrongPassword.Message }),
            _ => BadRequest()
        };
    }
}
